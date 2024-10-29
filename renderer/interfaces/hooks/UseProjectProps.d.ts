import { FetchUserProjectsResponse } from '../api';

export interface UseProjectProps {
	userProjects: FetchUserProjectsResponse[] | null;
	setUserProjects: React.Dispatch<
		React.SetStateAction<FetchUserProjectsResponse[] | null>
	>;

	handleCreateProject: ({ userId }: handleCreateProjectProps) => Promise<void>;
	handleFetchUserProjects: ({
		userId,
	}: handleFetchUserProjectsProps) => Promise<void>;
}

export interface handleCreateProjectProps {
	userId: string;
}

export interface handleFetchUserProjectsProps {
	userId: string;
}
