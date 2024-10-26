'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	handleAddTableProps,
	TableProps,
	UseLayoutProps,
} from '../../interfaces';
import { usePalette } from '../common';

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
			id: '2',
			name: tableName,
			columns: [],
			color: palette.layout.editLayout.leftBar.tableHeader.default,
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
	};
};
