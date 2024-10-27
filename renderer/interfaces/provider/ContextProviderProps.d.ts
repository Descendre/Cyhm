import { windowModeProps } from './windowModeProps';
import { TablesStateProps } from './TableProps';
import { ColumnsStateProps } from './ColumnProps';

export interface ContextProviderProps {
	windowMode: windowModeProps;
	setWindowMode: React.Dispatch<React.SetStateAction<windowModeProps | null>>;
	isMic: boolean;
	setIsMic: React.Dispatch<React.SetStateAction<boolean>>;
	isAudio: boolean;
	setIsAudio: React.Dispatch<React.SetStateAction<boolean>>;
	tables: TablesStateProps;
	setTables: React.Dispatch<React.SetStateAction<TablesStateProps>>;
	columns: ColumnsStateProps;
	setColumns: React.Dispatch<React.SetStateAction<ColumnsStateProps>>;
	isTableAddMode: boolean;
	setIsTableAddMode: React.Dispatch<React.SetStateAction<boolean>>;
	addColumnIndex: string | null;
	setAddColumnIndex: React.Dispatch<React.SetStateAction<string | null>>;
}
