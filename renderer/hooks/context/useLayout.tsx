'use client';
import { ReactNode, useCallback, useContext } from 'react';
import { Context } from '../../provider';
import {
	AddTableResponse,
	ColumnConstraintResponse,
	EditReactFlowCustomNodeDataProps,
	handleDefaultConstraintValidationIPCProps,
	handleGetReferencingForeignKeyInfosReturnSqlite,
	handleSelectColumnConstraintItemProps,
	handleToggleColumnConstraintExpansionProps,
	TablesStateProps,
	UseLayoutProps,
	validateDefaultConstraintSqliteReturn,
} from '../../interfaces';
import { Node, XYPosition } from '@xyflow/react';
import {
	BlockOutlined,
	Check,
	DataObject,
	DescriptionOutlined,
	DoDisturb,
	EventNote,
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
	SupabaseColumnType,
} from '@prisma/client';
import { debounce } from 'lodash';

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
		constraintEditingTableId,
		setConstraintEditingTableId,
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

	const handleGetColumnTypeTextWithSupabase = (
		type: SupabaseColumnType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	): ReactNode => {
		return type === 'STRING' ? (
			<Typography
				title="STRING"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				height="100%"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.string}
				sx={{
					cursor: 'pointer',
				}}
			>
				<TextFields
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'STRING'}
			</Typography>
		) : type === 'INT' ? (
			<Typography
				title="INT"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				height="100%"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.int}
				sx={{
					cursor: 'pointer',
				}}
			>
				<Numbers
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'INT'}
			</Typography>
		) : type === 'BIGINT' ? (
			<Typography
				title="BIGINT"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.bigInt}
				sx={{
					cursor: 'pointer',
				}}
			>
				<Numbers
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'BIGINT'}
			</Typography>
		) : type === 'FLOAT' ? (
			<Typography
				title="FLOAT"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.float}
				sx={{
					cursor: 'pointer',
				}}
			>
				<StackedBarChart
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'FLOAT'}
			</Typography>
		) : type === 'DECIMAL' ? (
			<Typography
				title="DECIMAL"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.decimal}
				sx={{
					cursor: 'pointer',
				}}
			>
				<StackedBarChart
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'DECIMAL'}
			</Typography>
		) : type === 'BOOLEAN' ? (
			<Typography
				title="BOOLEAN"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.boolean}
				sx={{
					cursor: 'pointer',
				}}
			>
				<DoDisturb
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'BOOLEAN'}
			</Typography>
		) : type === 'DATETIME' ? (
			<Typography
				title="DATETIME"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.dateTime}
				sx={{
					cursor: 'pointer',
				}}
			>
				<EventNote
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'DATETIME'}
			</Typography>
		) : type === 'JSON' ? (
			<Typography
				title="JSON"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.json}
				sx={{
					cursor: 'pointer',
				}}
			>
				<DataObject
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'JSON'}
			</Typography>
		) : type === 'BYTES' ? (
			<Typography
				title="BYTES"
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				variant="body2"
				fontSize={fontSize}
				color={palette.components.edit.reactFlow.column.color.supabase.bytes}
				sx={{
					cursor: 'pointer',
				}}
			>
				<DataObject
					sx={{
						fontSize: iconSize,
					}}
				/>
				{withText && 'BYTES'}
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
				color={palette.components.edit.reactFlow.column.color.supabase.null}
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

	const handleGetReferencingForeignKeyInfosSqlite = (
		constraint: ColumnConstraintResponse
	): handleGetReferencingForeignKeyInfosReturnSqlite[] => {
		// 渡された制約が主キーの場合その主キーを参照中の外部キー制約のIDを配列取得
		const referencingForeignKeyIds: string[] =
			constraint.type === 'PRIMARY_KEY'
				? constraint.toReferences.map((reference) => reference.foreignKeyId)
				: [];

		// 外部キーIDに関連するカラムとテーブル情報を取得
		const referencingInfos = Object.values(columns).flatMap((columnArray) =>
			columnArray
				.filter((column) =>
					column.columnConstraints.some((constraint) =>
						constraint.fromReferences.some(
							(reference) =>
								referencingForeignKeyIds.includes(reference.foreignKeyId) // 外部キーIDが参照リストに含まれているかをチェック
						)
					)
				)
				.map((column) => {
					const tableId = column.tableId;
					const tableName = tables[tableId]?.name;
					const tableColor = tables[tableId]?.color;
					return {
						tableColor: tableColor,
						tableName: tableName,
						sqliteType: column.sqliteType,
						columnName: column.name,
					};
				})
		);

		const sortedReferencingInfos = referencingInfos.sort((a, b) =>
			a.columnName.localeCompare(b.columnName)
		);
		return sortedReferencingInfos;
	};

	const handleGetReferencingPrimaryKeyInfoSqlite = (
		constraint: ColumnConstraintResponse
	) => {
		// 渡された制約が外部キーの場合その外部キーが参照中の主キー制約のIDを取得
		const referencingPrimaryKeyId: string | null =
			constraint.type === 'FOREIGN_KEY'
				? constraint.fromReferences[0]?.primaryKeyId
				: null;
		if (!referencingPrimaryKeyId) {
			return null;
		}

		// すべてのカラムを取得して処理
		const allColumns = Object.values(columns).flatMap(
			(columnArray) => columnArray
		);

		// 主キー制約IDに関連するカラムを探す
		const referencedColumn = allColumns.find((column) =>
			column.columnConstraints.some((colConstraint) => {
				// toReferencesが空の可能性を考慮
				if (
					!colConstraint.toReferences ||
					colConstraint.toReferences.length === 0
				) {
					return false;
				}

				// 比較
				return colConstraint.toReferences.some(
					(reference) => reference.primaryKeyId === referencingPrimaryKeyId
				);
			})
		);

		if (!referencedColumn) {
			return null;
		}

		const tableId = referencedColumn.tableId;
		const tableName = tables[tableId]?.name;
		const tableColor = tables[tableId]?.color;

		return {
			tableId: tableId,
			columnId: referencedColumn.id,
			tableColor: tableColor,
			tableName: tableName,
			sqliteType: referencedColumn.sqliteType,
			columnName: referencedColumn.name,
		};
	};

	const handleDebouncedDefaultConstraintValidationIPC = useCallback(
		debounce(
			async ({
				column,
				value,
			}: handleDefaultConstraintValidationIPCProps): Promise<validateDefaultConstraintSqliteReturn | null> => {
				if (!column || !value) return null;

				if (typeof window !== 'undefined' && window.ipc) {
					try {
						const validationResult =
							await window.ipc.invoke<validateDefaultConstraintSqliteReturn>(
								'default-validate-sqlite',
								{
									column,
									value,
								}
							);
						setColumnConstraintEditInfo((prev) => ({
							...prev,
							errorText: validationResult.message,
						}));
						return validationResult;
					} catch (error) {
						console.error('Validation error:', error);
						return null;
					}
				} else {
					console.error('IPC is not available');
					return null;
				}
			},
			500
		),
		[]
	);

	const handleDefaultConstraintValidationIPC = useCallback(
		async ({
			column,
			value,
		}: handleDefaultConstraintValidationIPCProps): Promise<validateDefaultConstraintSqliteReturn | null> => {
			if (!column || !value) return null;

			if (typeof window !== 'undefined' && window.ipc) {
				try {
					const validationResult =
						await window.ipc.invoke<validateDefaultConstraintSqliteReturn>(
							'default-validate-sqlite',
							{
								column,
								value,
							}
						);
					setColumnConstraintEditInfo((prev) => ({
						...prev,
						errorText: validationResult.message,
					}));
					return validationResult;
				} catch (error) {
					console.error('Validation error:', error);
					return null;
				}
			} else {
				console.error('IPC is not available');
				return null;
			}
		},
		[]
	);

	const handleSelectColumnConstraintItem = ({
		columnId,
	}: handleSelectColumnConstraintItemProps): void => {
		if (columnConstraintEditInfo?.columnId === columnId) {
			setColumnConstraintEditInfo({
				columnId: null,
				columnConstraintType: null,
				clauseType: null,
				primaryKeyId: null,
				value: null,
				errorText: null,
			});
			return;
		}
		setColumnConstraintEditInfo({
			columnId: columnId,
			columnConstraintType: null,
			clauseType: null,
			primaryKeyId: null,
			value: null,
			errorText: null,
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
		constraintEditingTableId,
		setConstraintEditingTableId,
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
		handleGetColumnTypeTextWithSupabase,
		handleGetConstraintIcon,
		handleGetClauseTextWithSQlite,
		handleGetNoOptionText,
		handleGetReferencingForeignKeyInfosSqlite,
		handleGetReferencingPrimaryKeyInfoSqlite,
		handleDebouncedDefaultConstraintValidationIPC,
		handleDefaultConstraintValidationIPC,
		handleSelectColumnConstraintItem,
		handleToggleColumnConstraintExpansion,
		handleAllTableExpansion,
		handleSelectTable,
		handleSetAddColumnIndex,
		handleGetNodesFromTables,
		handleSwitchUserPopperViewMode,
	};
};
