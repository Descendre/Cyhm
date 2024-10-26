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
}

export interface handleAddTableProps {
	tableName: string;
}
