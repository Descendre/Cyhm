import { Node } from '@xyflow/react';
import { windowModeProps } from '../provider';

export interface UseLayoutProps {
	windowMode: windowModeProps;
	setWindowMode: React.Dispatch<React.SetStateAction<windowModeProps | null>>;
	tables: TablesStateProps;
	setTables: React.Dispatch<React.SetStateAction<TablesStateProps>>;
	columns: ColumnsStateProps;
	setColumns: React.Dispatch<React.SetStateAction<ColumnsStateProps>>;
	isTableAddMode: boolean;
	setIsTableAddMode: React.Dispatch<React.SetStateAction<boolean>>;

	handleStartProject: () => void;
	handleEndProject: () => void;
	handleAddTable: ({ tableName }: handleAddTableProps) => void;
	handleGetNodesFromTables: () => Node[];
}

export interface handleAddTableProps {
	tableName: string;
}

export interface EditReactFlowCustomNodeDataProps {
	title: string;
	color: string;
	[key: string]: unknown;
}
