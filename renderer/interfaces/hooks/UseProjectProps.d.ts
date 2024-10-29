export interface UseProjectProps {
	handleCreateProject: ({ userId }: handleCreateProjectProps) => Promise<void>;
}
export interface handleCreateProjectProps {
	userId: string;
}
