'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	AddTableResponse,
	EditReactFlowCustomNodeDataProps,
	handleToggleColumnConstraintExpansionProps,
	TablesStateProps,
	UseLayoutProps,
} from '../../interfaces';
import { Node, XYPosition } from '@xyflow/react';
import {
	BlockOutlined,
	Check,
	DescriptionOutlined,
	Key,
	Link,
	StarOutline,
} from '@mui/icons-material';
import { usePalette } from '../common';
import { Box, Typography } from '@mui/material';
import { ColumnConstraintType } from '@prisma/client';

export const useLayout = (): UseLayoutProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const palette = usePalette();

	const {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,
		EditRightPopperRef,

		windowMode,
		setWindowMode,
		tables,
		setTables,
		columns,
		setColumns,
		selectedConstraintColumnId,
		setSelectedConstraintColumnId,
		isTableAddMode,
		setIsTableAddMode,
		addColumnIndex,
		setAddColumnIndex,
		selectedTableId,
		setSelectedTableId,
		lastSelectedTableId,
		setLastSelectedTableId,
		isEditLeftBar,
		setIsEditLeftBar,
		isEditRightPopper,
		setIsEditRightPopper,
		userPopperViewMode,
		setUserPopperViewMode,
		isPreparingProject,
		setIsPreparingProject,
	} = context;

	const handleGithubExternalShellOpen = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('github-open');
		} else {
			console.error('IPC is not available');
		}
	};

	const handleGetConstraintIcon = (
		constraintName: ColumnConstraintType,
		withText: boolean
	) => {
		switch (constraintName) {
			case 'PRIMARY_KEY':
				return (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
					>
						<Key
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.primaryKey,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize="0.6rem"
								color={palette.layout.editLayout.leftBar.constraint.primaryKey}
							>
								PRIMARY KEY
							</Typography>
						)}
					</Box>
				);
			case 'NOT_NULL':
				return (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
					>
						<BlockOutlined
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.notNull,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize="0.6rem"
								color={palette.layout.editLayout.leftBar.constraint.notNull}
							>
								NOT NULL
							</Typography>
						)}
					</Box>
				);
			case 'UNIQUE':
				return (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
					>
						<StarOutline
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.unique,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize="0.6rem"
								color={palette.layout.editLayout.leftBar.constraint.unique}
							>
								UNIQUE
							</Typography>
						)}
					</Box>
				);
			case 'FOREIGN_KEY':
				return (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
					>
						<Link
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.foreignKey,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize="0.6rem"
								color={palette.layout.editLayout.leftBar.constraint.foreignKey}
							>
								FOREIGN KEY
							</Typography>
						)}
					</Box>
				);
			case 'CHECK':
				return (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
					>
						<Check
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.check,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize="0.6rem"
								color={palette.layout.editLayout.leftBar.constraint.check}
							>
								CHECK
							</Typography>
						)}
					</Box>
				);
			case 'DEFAULT':
				return (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
					>
						<DescriptionOutlined
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.default,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize="0.6rem"
								color={palette.layout.editLayout.leftBar.constraint.default}
							>
								DEFAULT
							</Typography>
						)}
					</Box>
				);
			default:
				return null;
		}
	};

	const handleToggleColumnConstraintExpansion = ({
		tableId,
		columnId,
	}: handleToggleColumnConstraintExpansionProps): void => {
		setColumns((prevColumns) => {
			return {
				...prevColumns,
				[tableId]: prevColumns[tableId].map((column) =>
					column.id === columnId
						? { ...column, isConstraintExpand: !column.isConstraintExpand }
						: column
				),
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

	const handleSelectTable = (table: AddTableResponse | null): void => {
		if (table) {
			setSelectedTableId(table.id);
			setLastSelectedTableId(table.id);
		} else {
			setSelectedTableId(null);
		}
	};

	const handleSetAddColumnIndex = (table: AddTableResponse): void => {
		if (!table.isEditing) return;
		setAddColumnIndex(table.id);
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

	const handleSwitchUserPopperViewMode = (): void => {
		setUserPopperViewMode((prevMode) => {
			switch (prevMode) {
				case 'member':
					return 'invite';
				case 'invite':
					return 'invited';
				case 'invited':
					return 'member';
				default:
					return 'member';
			}
		});
	};

	return {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,
		EditRightPopperRef,

		windowMode,
		setWindowMode,
		tables,
		setTables,
		columns,
		setColumns,
		selectedConstraintColumnId,
		setSelectedConstraintColumnId,
		isTableAddMode,
		setIsTableAddMode,
		addColumnIndex,
		setAddColumnIndex,
		selectedTableId,
		setSelectedTableId,
		lastSelectedTableId,
		setLastSelectedTableId,
		isEditLeftBar,
		setIsEditLeftBar,
		isEditRightPopper,
		setIsEditRightPopper,
		userPopperViewMode,
		setUserPopperViewMode,
		isPreparingProject,
		setIsPreparingProject,

		handleGithubExternalShellOpen,
		handleGetConstraintIcon,
		handleToggleColumnConstraintExpansion,
		handleAllTableExpansion,
		handleSelectTable,
		handleSetAddColumnIndex,
		handleGetNodesFromTables,
		handleSwitchUserPopperViewMode,
	};
};
