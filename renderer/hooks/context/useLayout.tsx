'use client';
import { ReactNode, useContext } from 'react';
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
	BarChart,
	BlockOutlined,
	CalendarToday,
	Check,
	Description,
	DescriptionOutlined,
	DoNotDisturb,
	HelpOutline,
	Key,
	Link,
	Numbers,
	StackedBarChart,
	StarOutline,
	TextFields,
} from '@mui/icons-material';
import { usePalette } from '../common';
import { Box, Typography } from '@mui/material';
import { ColumnConstraintType, ColumnType } from '@prisma/client';

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

	const handleGetColumnTypeText = (
		type: ColumnType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	): ReactNode => {
		return type === 'INT' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				height="100%"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.int}
			>
				<Numbers
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'INT'}
			</Typography>
		) : type === 'VARCHAR' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.varchar}
			>
				<TextFields
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'VARCHAR'}
			</Typography>
		) : type === 'BOOLEAN' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.boolean}
			>
				<DoNotDisturb
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'BOOLEAN'}
			</Typography>
		) : type === 'DATE' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.date}
			>
				<CalendarToday
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'DATE'}
			</Typography>
		) : type === 'TEXT' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.text}
			>
				<Description
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'TEXT'}
			</Typography>
		) : type === 'FLOAT' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.float}
			>
				<BarChart
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'FLOAT'}
			</Typography>
		) : type === 'DOUBLE' ? (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.double}
			>
				<StackedBarChart
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'DOUBLE'}
			</Typography>
		) : (
			<Typography
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.undefined}
			>
				<HelpOutline
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'UNDEFINED'}
			</Typography>
		);
	};

	const handleGetConstraintIcon = (
		constraintName: ColumnConstraintType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	): ReactNode => {
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
								fontSize: iconSize,
								color: palette.layout.editLayout.leftBar.constraint.primaryKey,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize={fontSize}
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
								fontSize: iconSize,
								color: palette.layout.editLayout.leftBar.constraint.notNull,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize={fontSize}
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
								fontSize: iconSize,
								color: palette.layout.editLayout.leftBar.constraint.unique,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize={fontSize}
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
								fontSize: iconSize,
								color: palette.layout.editLayout.leftBar.constraint.foreignKey,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize={fontSize}
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
								fontSize: iconSize,
								color: palette.layout.editLayout.leftBar.constraint.check,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize={fontSize}
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
								fontSize: iconSize,
								color: palette.layout.editLayout.leftBar.constraint.default,
							}}
						/>
						{withText && (
							<Typography
								variant="body2"
								fontSize={fontSize}
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
		handleGetColumnTypeText,
		handleGetConstraintIcon,
		handleToggleColumnConstraintExpansion,
		handleAllTableExpansion,
		handleSelectTable,
		handleSetAddColumnIndex,
		handleGetNodesFromTables,
		handleSwitchUserPopperViewMode,
	};
};
