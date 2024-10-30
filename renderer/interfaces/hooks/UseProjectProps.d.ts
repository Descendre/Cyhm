import {
	AddColumnResponse,
	AddTableResponse,
	FetchUserProjectsResponse,
} from '../api';

export interface UseProjectProps {
	userProjects: FetchUserProjectsResponse[] | null;
	setUserProjects: React.Dispatch<
		React.SetStateAction<FetchUserProjectsResponse[] | null>
	>;
	currentProject: FetchUserProjectsResponse | null;
	setCurrentProject: React.Dispatch<
		React.SetStateAction<FetchUserProjectsResponse | null>
	>;
	isSubscribed: boolean;
	setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;

	handleCreateProject: ({ userId }: handleCreateProjectProps) => Promise<void>;
	handleFetchUserProjects: ({
		userId,
	}: handleFetchUserProjectsProps) => Promise<void>;
	handleStartProject: ({ userId }: handleStartProjectProps) => void;
	handleEndProject: () => void;
	handleAddTable: ({
		projectId,
		tableName,
	}: handleAddTableProps) => Promise<void>;
	handleAddColumn: ({
		name,
		type,
		tableId,
	}: handleAddColumnProps) => Promise<void>;
	handleOpenTableExpansion: ({
		tableId,
	}: handleOpenTableExpansionProps) => void;
}

export interface handleCreateProjectProps {
	userId: string;
}

export interface handleFetchUserProjectsProps {
	userId: string;
}

export interface handleStartProjectProps {
	project: FetchUserProjectsResponse;
}

export interface handleAddTableProps {
	projectId: string;
	tableName: string;
}

export interface handleAddColumnProps {
	name: string;
	tableId: string;
}

export interface handleOpenTableExpansionProps {
	tableId: string;
}

export interface TableChannelPayloadProps {
	newTable: AddTableResponse;
	userId: string;
}

export interface ColumnChannelPayloadProps {
	newColumn: AddColumnResponse;
	userId: string;
}
