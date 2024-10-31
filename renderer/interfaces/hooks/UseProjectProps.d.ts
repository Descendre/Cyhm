import { Node } from '@xyflow/react';
import {
	AddColumnResponse,
	AddTableResponse,
	FetchUserProjectsResponse,
} from '../api';
import { ColumnEditStateProps, TableEditStateProps } from '../provider';
import { ColumnType } from '@prisma/client';

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
	tableEditInfo: TableEditStateProps;
	setTableEditInfo: React.Dispatch<React.SetStateAction<TableEditStateProps>>;
	columnEditInfo: ColumnEditStateProps;
	setColumnEditInfo: React.Dispatch<React.SetStateAction<ColumnEditStateProps>>;

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
	handleTableExpansion: ({
		tableId,
	}: handleTableExpansionProps) => Promose<void>;
	handleTableEditMode: ({ tableId }: handleTableEditProps) => Promose<void>;
	handleTableNameChange: ({
		tableId,
		event,
	}: handleTableNameChangeProps) => void;
	handleTableNameUpdate: ({
		tableId,
		name,
	}: handleTableNameUpdateProps) => Promise<void>;
	handleTableColorChange: ({
		tableId,
		color,
	}: handleTableColorChangeProps) => void;
	handleTableColorUpdate: ({
		tableId,
		color,
	}: handleTableColorUpdateProps) => Promise<void>;
	handleColumnNameChange: ({
		tableId,
		columnId,
		name,
	}: handleColumnNameChangeProps) => void;
	handleColumnNameUpdate: ({
		tableId,
		columnId,
		name,
	}: handleColumnNameUpdateProps) => Promose<void>;
	handleUpdateColumnType: ({
		tableId,
		columnId,
		type,
	}: handleUpdateColumnTypeProps) => Promose<void>;
	handleNodeDragStop: ({ node }: handleNodeDragStopProps) => Promise<void>;
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

export interface handleTableExpansionProps {
	tableId: string;
}

export interface handleTableEditProps {
	tableId: string;
}

export interface handleTableNameChangeProps {
	tableId: string;
	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

export interface handleTableNameUpdateProps {
	tableId: string;
	name: string;
}

export interface handleTableColorChangeProps {
	tableId: string;
	color: string;
}

export interface handleTableColorUpdateProps {
	tableId: string;
	color: string;
}

export interface handleColumnNameChangeProps {
	tableId: string;
	columnId: string;
	name: string;
}

export interface handleColumnNameUpdateProps {
	tableId: string;
	columnId: string;
	name: string;
}

export interface handleUpdateColumnTypeProps {
	tableId: string;
	columnId: string;
	type: ColumnType;
}

export interface handleNodeDragStopProps {
	node: Node;
}

export interface TableChannelPayloadProps {
	newTable: AddTableResponse;
	userId: string;
}

export interface ColumnChannelPayloadProps {
	newColumn: AddColumnResponse;
	userId: string;
}
