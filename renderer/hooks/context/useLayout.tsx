'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	EditReactFlowCustomNodeDataProps,
	handleAddTableProps,
	TableProps,
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
		windowMode,
		setWindowMode,
		tables,
		setTables,
		columns,
		setColumns,
		isTableAddMode,
		setIsTableAddMode,
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

	const handleGetNodesFromTables = (): Node[] => {
		if (!tables) return [];

		return Object.values(tables).map((table) => ({
			id: table.id,
			type: 'editRectFlowCustomNode',
			data: {
				title: table.name,
				color: table.color,
			} as EditReactFlowCustomNodeDataProps,
			position: table.position,
		}));
	};

	return {
		windowMode,
		setWindowMode,
		tables,
		setTables,
		columns,
		setColumns,
		isTableAddMode,
		setIsTableAddMode,

		handleStartProject,
		handleEndProject,
		handleAddTable,
		handleGetNodesFromTables,
	};
};
