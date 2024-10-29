'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	EditReactFlowCustomNodeDataProps,
	handleTableExpansionProps,
	TablesStateProps,
	UseLayoutProps,
} from '../../interfaces';
import { Node } from '@xyflow/react';

export const useLayout = (): UseLayoutProps => {
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

	const handleEndProject = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-end');
		} else {
			console.error('IPC is not available');
		}
		setWindowMode('top');
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

		handleEndProject,
		handleTableExpansion,
		handleAllTableExpansion,
		handleGetNodesFromTables,
		handleTableEditMode,
	};
};
