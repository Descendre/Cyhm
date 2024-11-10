import { Node } from '@xyflow/react';
import {
	ColumnsStateProps,
	TablesStateProps,
	UserPopperViewModeProps,
	windowModeProps,
} from '../provider';
import { AddTableResponse } from '../api';
import { ColumnConstraintType, ColumnType } from '@prisma/client';
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
	selectedConstraintColumnId: string | null;
	setSelectedConstraintColumnId: React.Dispatch<
		React.SetStateAction<string | null>
	>;
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

	handleGithubExternalShellOpen: () => void;
	handleToggleColumnConstraintExpansion: ({
		tableId,
		columnId,
	}: handleToggleColumnConstraintExpansionProps) => void;
	handleGetColumnTypeText: (
		type: ColumnType,
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
	handleAllTableExpansion: (expand: boolean) => void;
	handleSelectTable: (table: AddTableResponse) => void;
	handleSetAddColumnIndex: (table: AddTableResponse) => void;
	handleGetNodesFromTables: () => Node[];
	handleSwitchUserPopperViewMode: () => void;
}

export interface handleToggleColumnConstraintExpansionProps {
	tableId: string;
	columnId: string;
}

export interface EditReactFlowCustomNodeDataProps {
	tableData: AddTableResponse;
	[key: string]: unknown;
}
