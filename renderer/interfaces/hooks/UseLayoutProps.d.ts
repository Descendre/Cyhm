import { Node } from '@xyflow/react';
import {
	ColumnsStateProps,
	TableProps,
	TablesStateProps,
	windowModeProps,
} from '../provider';

export interface UseLayoutProps {
	EditLeftBarTableAreaRef: React.RefObject<HTMLDivElement | null>;
	EditReactFlowAreaRef: React.RefObject<HTMLDivElement | null>;
	EditFooterAddColumnIconRef: React.RefObject<HTMLDivElement | null>;

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
	selectedTable: TableProps | null;
	setSelectedTable: React.Dispatch<React.SetStateAction<TableProps | null>>;
	isEditLeftBar: boolean;
	setIsEditLeftBar: React.Dispatch<React.SetStateAction<boolean>>;
	isCreatingProject: boolean;
	setIsCreatingProject: React.Dispatch<React.SetStateAction<boolean>>;

	handleEndProject: () => void;
	handleAddTable: ({ tableName }: handleAddTableProps) => void;
	handleTableExpansion: ({ tableId }: handleTableExpansionProps) => void;
	handleOpenTableExpansion: ({
		tableId,
	}: handleOpenTableExpansionProps) => void;
	handleAllTableExpansion: (expand: boolean) => void;
	handleAddColumn: ({ tableId, columnName }: handleAddColumnProps) => void;
	handleGetNodesFromTables: () => Node[];
	handleTableEditMode: (tablId: string) => void;
}

export interface handleAddTableProps {
	tableName: string;
}

export interface handleTableExpansionProps {
	tableId: string;
}

export interface handleOpenTableExpansionProps {
	tableId: string;
}

export interface handleAddColumnProps {
	tableId: string;
	columnName: string;
}

export interface EditReactFlowCustomNodeDataProps {
	tableData: TableProps;
	[key: string]: unknown;
}
