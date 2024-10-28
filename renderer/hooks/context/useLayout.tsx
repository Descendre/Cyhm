'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	ColumnProps,
	EditReactFlowCustomNodeDataProps,
	handleAddColumnProps,
	handleAddTableProps,
	handleOpenTableExpansionProps,
	handleTableExpansionProps,
	TableProps,
	TablesStateProps,
	UseLayoutProps,
} from '../../interfaces';
import { usePalette } from '../common';
import { Node } from '@xyflow/react';

export const useLayout = (): UseLayoutProps => {
	const palette = usePalette();
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,

		windowMode,
		setWindowMode,
		tables,
		setTables,
		columns,
		setColumns,
		isTableAddMode,
		setIsTableAddMode,
		addColumnIndex,
		setAddColumnIndex,
		selectedTable,
		setSelectedTable,
		isEditLeftBar,
		setIsEditLeftBar,
	} = context;

	const handleStartProject = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-start');
		} else {
			console.error('IPC is not available');
		}
		setWindowMode('edit');
	};

	const handleEndProject = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-end');
		} else {
			console.error('IPC is not available');
		}
		setWindowMode('top');
	};

	const handleAddTable = ({ tableName }: handleAddTableProps): void => {
		const newTable: TableProps = {
			id: Date.now().toString(),
			name: tableName,
			columns: [],
			color: palette.components.edit.reactFlow.tableHeader.default,
			isExpanded: true,
			isEditing: false,
			position: { x: 200, y: 300 },
		};

		setTables((prevTables) => {
			if (prevTables === null) {
				return { [newTable.id]: newTable };
			}

			return {
				...prevTables,
				[newTable.id]: newTable,
			};
		});

		setIsTableAddMode(false);
	};

	const handleTableExpansion = ({
		tableId,
	}: handleTableExpansionProps): void => {
		setTables((prevTables) => {
			if (!prevTables || !prevTables[tableId]) return prevTables;
			return {
				...prevTables,
				[tableId]: {
					...prevTables[tableId],
					isExpanded: !prevTables[tableId].isExpanded,
				},
			};
		});
	};

	const handleOpenTableExpansion = ({
		tableId,
	}: handleOpenTableExpansionProps): void => {
		setTables((prevTables) => {
			if (!prevTables || !prevTables[tableId]) return prevTables;
			return {
				...prevTables,
				[tableId]: {
					...prevTables[tableId],
					isExpanded: true,
				},
			};
		});
	};

	const handleAllTableExpansion = (expand: boolean): void => {
		setTables((prevTables) => {
			if (!prevTables) return prevTables;
			const updatedTables = Object.keys(prevTables).reduce((acc, tableId) => {
				acc[tableId] = {
					...prevTables[tableId],
					isExpanded: expand,
				};
				return acc;
			}, {} as TablesStateProps);

			return updatedTables;
		});
	};

	const handleAddColumn = ({
		tableId,
		columnName,
	}: handleAddColumnProps): void => {
		setColumns((prevColumns) => {
			const newColumn: ColumnProps = {
				id: Date.now().toString(),
				name: columnName,
				type: undefined,
				constraints: [
					'PRIMARY_KEY',
					'NOT_NULL',
					'UNIQUE',
					'FOREIGN_KEY',
					{ type: 'CHECK', value: 'aaaaa' },
					{ type: 'DEFAULT', value: 'aaa' },
				],
				defaultValue: null,
			};

			if (!prevColumns || !prevColumns[tableId]) {
				return {
					...prevColumns,
					[tableId]: [newColumn],
				};
			}

			return {
				...prevColumns,
				[tableId]: [...prevColumns[tableId], newColumn],
			};
		});

		setAddColumnIndex(null);
		handleOpenTableExpansion({ tableId: tableId });
	};

	const handleGetNodesFromTables = (): Node[] => {
		if (!tables) return [];

		return Object.values(tables).map((table) => ({
			id: table.id,
			type: 'editRectFlowCustomNode',
			data: {
				tableData: table,
			} as EditReactFlowCustomNodeDataProps,
			position: table.position,
		}));
	};

	const handleTableEditMode = (tableId: string): void => {
		setTables((prevTables) => {
			if (!prevTables) return null;
			const updatedTables = { ...prevTables };
			if (updatedTables[tableId]) {
				updatedTables[tableId] = {
					...updatedTables[tableId],
					isEditing: !updatedTables[tableId].isEditing,
				};
			}
			return updatedTables;
		});
	};

	return {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,

		windowMode,
		setWindowMode,
		tables,
		setTables,
		columns,
		setColumns,
		isTableAddMode,
		setIsTableAddMode,
		addColumnIndex,
		setAddColumnIndex,
		selectedTable,
		setSelectedTable,
		isEditLeftBar,
		setIsEditLeftBar,

		handleStartProject,
		handleEndProject,
		handleAddTable,
		handleTableExpansion,
		handleOpenTableExpansion,
		handleAllTableExpansion,
		handleAddColumn,
		handleGetNodesFromTables,
		handleTableEditMode,
	};
};
