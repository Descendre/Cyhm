import { Node } from '@xyflow/react';
import {
	ColumnsStateProps,
	ColumnStatePropsExtended,
	TablesStateProps,
	UserPopperViewModeProps,
	windowModeProps,
} from '../provider';
import { AddTableResponse, ColumnConstraintResponse } from '../api';
import {
	ColumnConstraintType,
	SqliteClauseType,
	SQliteColumnType,
	SupabaseColumnType,
} from '@prisma/client';
import { ReactNode } from 'react';

export interface UseLayoutProps {
	EditLeftBarTableAreaRef: React.RefObject<HTMLDivElement | null>;
	EditReactFlowAreaRef: React.RefObject<HTMLDivElement | null>;
	EditFooterAddColumnIconRef: React.RefObject<HTMLDivElement | null>;
	EditRightPopperRef: React.RefObject<HTMLDivElement | null>;

	windowMode: windowModeProps;
	setWindowMode: React.Dispatch<React.SetStateAction<windowModeProps | null>>;
	tables: TablesStateProps;
	setTables: React.Dispatch<React.SetStateAction<TablesStateProps>>;
	columns: ColumnsStateProps;
	setColumns: React.Dispatch<React.SetStateAction<ColumnsStateProps>>;
	isTableAddMode: boolean;
	setIsTableAddMode: React.Dispatch<React.SetStateAction<boolean>>;
	addColumnIndex: string | null;
	setAddColumnIndex: React.Dispatch<React.SetStateAction<string | null>>;
	selectedTableId: string | null;
	setSelectedTableId: React.Dispatch<React.SetStateAction<string | null>>;
	lastSelectedTableId: string | null;
	setLastSelectedTableId: React.Dispatch<React.SetStateAction<string | null>>;
	isEditLeftBar: boolean;
	setIsEditLeftBar: React.Dispatch<React.SetStateAction<boolean>>;
	isEditRightPopper: boolean;
	setIsEditRightPopper: React.Dispatch<React.SetStateAction<boolean>>;
	isPreparingProject: string | null;
	setIsPreparingProject: React.Dispatch<React.SetStateAction<string | null>>;
	userPopperViewMode: UserPopperViewModeProps;
	setUserPopperViewMode: React.Dispatch<
		React.SetStateAction<UserPopperViewModeProps>
	>;
	isConstraintDeleting: boolean;
	setIsConstraintDeleting: React.Dispatch<React.SetStateAction<boolean>>;
	constraintEditingTableId: string | null;
	setConstraintEditingTableId: React.Dispatch<
		React.SetStateAction<string | null>
	>;

	handleGithubExternalShellOpen: () => void;
	handleToggleColumnConstraintExpansion: ({
		tableId,
		columnId,
	}: handleToggleColumnConstraintExpansionProps) => void;
	handleGetColumnTypeTextWithSQlite: (
		type: SQliteColumnType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	) => ReactNode;
	handleGetColumnTypeTextWithSupabase: (
		type: SupabaseColumnType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	) => ReactNode;
	handleGetConstraintIcon: (
		constraintName: ColumnConstraintType,
		withText: boolean,
		iconSize: string,
		fontSize: string
	) => ReactNode;
	handleGetClauseTextWithSQlite: (
		type: SqliteClauseType,
		fontSize: string
	) => ReactNode;
	handleGetNoOptionText: (fontSize: string) => ReactNode;
	handleGetReferencingForeignKeyInfosSqlite: (
		constraint: ColumnConstraintResponse
	) => handleGetReferencingForeignKeyInfosReturnSqlite[];
	handleGetReferencingPrimaryKeyInfoSqlite: (
		constraint: ColumnConstraintResponse
	) => handleGetReferencingPrimaryKeyInfoReturnSqlite;
	handleDebouncedDefaultConstraintValidationIPC: ({
		column,
		value,
	}: handleDebouncedDefaultConstraintValidationIPCProps) => Promose<validateDefaultConstraintSqliteReturn>;
	handleDefaultConstraintValidationIPC: ({
		column,
		value,
	}: handleDefaultConstraintValidationIPCProps) => Promose<validateDefaultConstraintSqliteReturn>;
	handleSelectColumnConstraintItem: ({
		columnId,
	}: handleSelectColumnConstraintItemProps) => void;
	handleAllTableExpansion: (expand: boolean) => void;
	handleSelectTable: (table: AddTableResponse) => void;
	handleSetAddColumnIndex: (table: AddTableResponse) => void;
	handleGetNodesFromTables: () => Node[];
	handleSwitchUserPopperViewMode: () => void;
}

export interface handleDebouncedDefaultConstraintValidationIPC {
	column: ColumnStatePropsExtended;
	value: string;
}

export interface handleDefaultConstraintValidationIPCProps {
	column: ColumnStatePropsExtended;
	value: string;
}

export interface validateDefaultConstraintSqliteReturn {
	message: string;
}

export interface handleSelectColumnConstraintItemProps {
	columnId: string;
}

export interface handleToggleColumnConstraintExpansionProps {
	tableId: string;
	columnId: string;
}

export interface EditReactFlowCustomNodeDataProps {
	tableData: AddTableResponse;
	[key: string]: unknown;
}

export interface handleGetReferencingForeignKeyInfosReturnSqlite {
	tableColor: string;
	tableName: string;
	sqliteType: SQliteColumnType;
	columnName: string;
}

export interface handleGetReferencingPrimaryKeyInfoReturnSqlite {
	columnId: string;
	tableId: string;
	tableColor: string;
	tableName: string;
	sqliteType: SQliteColumnType;
	columnName: string;
}
