import { FetchUserProjectsResponse } from '../api';

export interface UseProjectProps {
	userProjects: FetchUserProjectsResponse[] | null;
	setUserProjects: React.Dispatch<
		React.SetStateAction<FetchUserProjectsResponse[] | null>
	>;
	currentProject: FetchUserProjectsResponse | null;
	setCurrentProject: React.Dispatch<
		React.SetStateAction<FetchUserProjectsResponse | null>
	>;

	handleCreateProject: ({ userId }: handleCreateProjectProps) => Promise<void>;
	handleFetchUserProjects: ({
		userId,
	}: handleFetchUserProjectsProps) => Promise<void>;
	handleStartProject: ({ userId }: handleStartProjectProps) => void;
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
