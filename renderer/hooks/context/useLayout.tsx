'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	EditReactFlowCustomNodeDataProps,
	handleTableExpansionProps,
	TablesStateProps,
	UseLayoutProps,
} from '../../interfaces';
import { Node, XYPosition } from '@xyflow/react';

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
		isPreparingProject,
		setIsPreparingProject,
	} = context;

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
			position: table.position as XYPosition,
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
		isPreparingProject,
		setIsPreparingProject,

		handleTableExpansion,
		handleAllTableExpansion,
		handleGetNodesFromTables,
		handleTableEditMode,
	};
};
