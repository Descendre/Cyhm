'use client';
import { ReactNode, useContext } from 'react';
import { Context } from '../../provider';
import {
	AddTableResponse,
	EditReactFlowCustomNodeDataProps,
	handleSelectColumnConstraintItemProps,
	handleToggleColumnConstraintExpansionProps,
	TablesStateProps,
	UseLayoutProps,
} from '../../interfaces';
import { Node, XYPosition } from '@xyflow/react';
import {
	BlockOutlined,
	Check,
	DataObject,
	DescriptionOutlined,
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
import {
	ColumnConstraintType,
	SqliteClauseType,
	SQliteColumnType,
} from '@prisma/client';

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
		columnConstraintEditInfo,
		setColumnConstraintEditInfo,
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
		isConstraintDeleting,
		setIsConstraintDeleting,
	} = context;

	const handleGithubExternalShellOpen = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('github-open');
		} else {
			console.error('IPC is not available');
		}
	};

	const handleGetColumnTypeTextWithSQlite = (
		type: SQliteColumnType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	): ReactNode => {
		return type === 'INTEGER' ? (
			<Typography
				title="INTEGER"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				height="100%"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.sqlite.integer}
				sx={{
					cursor: 'pointer',
				}}
			>
				<Numbers
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'INTEGER'}
			</Typography>
		) : type === 'TEXT' ? (
			<Typography
				title="TEXT"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.sqlite.text}
				sx={{
					cursor: 'pointer',
				}}
			>
				<TextFields
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'TEXT'}
			</Typography>
		) : type === 'REAL' ? (
			<Typography
				title="REAL"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.sqlite.real}
				sx={{
					cursor: 'pointer',
				}}
			>
				<StackedBarChart
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'REAL'}
			</Typography>
		) : type === 'BLOB' ? (
			<Typography
				title="BLOB"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.sqlite.blob}
				sx={{
					cursor: 'pointer',
				}}
			>
				<DataObject
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'BLOB'}
			</Typography>
		) : (
			<Typography
				title="NULL"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.sqlite.null}
				sx={{
					cursor: 'pointer',
				}}
			>
				<HelpOutline
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'NULL'}
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
						title="PRIMARY KEY"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
						sx={{
							cursor: 'pointer',
						}}
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
						title="NOT NULL"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
						sx={{
							cursor: 'pointer',
						}}
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
						title="UNIQUE"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
						sx={{
							cursor: 'pointer',
						}}
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
						title="FOREIGN KEY"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
						sx={{
							cursor: 'pointer',
						}}
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
						title="CHECK"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
						sx={{
							cursor: 'pointer',
						}}
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
						title="DEFAULT"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="5px"
						sx={{
							cursor: 'pointer',
						}}
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

	const handleGetClauseTextWithSQlite = (
		type: SqliteClauseType,
		fontSize: string
	): ReactNode => {
		return type === 'AUTO_INCREMENT' ? (
			<Typography
				title="AUTO INCREMENT"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				height="100%"
				variant="body2"
				fontSize={fontSize}
				color={
					palette.layout.editLayout.columnConstraint.clauses.sqlite
						.autoIncrement
				}
				sx={{
					cursor: 'pointer',
				}}
			>
				AUTO INCREMENT
			</Typography>
		) : (
			<></>
		);
	};

	const handleGetNoOptionText = (fontSize: string): ReactNode => {
		return (
			<Typography title="選択を外す" variant="body2" fontSize={fontSize} noWrap>
				選択を外す
			</Typography>
		);
	};

	const handleSelectColumnConstraintItem = ({
		columnId,
	}: handleSelectColumnConstraintItemProps): void => {
		if (columnConstraintEditInfo?.columnId === columnId) {
			setColumnConstraintEditInfo({
				columnId: null,
				columnConstraintType: null,
				clauseType: null,
				primaryKeyIdToForeignKey: null,
			});
			return;
		}
		setColumnConstraintEditInfo({
			columnId: columnId,
			columnConstraintType: null,
			clauseType: null,
			primaryKeyIdToForeignKey: null,
		});
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
		isConstraintDeleting,
		setIsConstraintDeleting,

		handleGithubExternalShellOpen,
		handleGetColumnTypeTextWithSQlite,
		handleGetConstraintIcon,
		handleGetClauseTextWithSQlite,
		handleGetNoOptionText,
		handleSelectColumnConstraintItem,
		handleToggleColumnConstraintExpansion,
		handleAllTableExpansion,
		handleSelectTable,
		handleSetAddColumnIndex,
		handleGetNodesFromTables,
		handleSwitchUserPopperViewMode,
	};
};
