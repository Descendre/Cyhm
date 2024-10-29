'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import { axiosFetch } from '../../libs';
import { generateCUID } from '../../utils';
import {
	CreateProjectResponse,
	FetchProjectResponse,
	FetchUserProjectsResponse,
	handleCreateProjectProps,
	handleFetchUserProjectsProps,
	handleStartProjectProps,
	UseProjectProps,
} from '../../interfaces';

export const useProject = (): UseProjectProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const {
		setWindowMode,
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
	} = context;

	const handleCreateProject = async ({
		userId,
	}: handleCreateProjectProps): Promise<void> => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-start');
			setWindowMode('edit');
			const newProject = await axiosFetch.post<CreateProjectResponse>(
				`/api/supabase/project`,
				{
					name: `Project-${generateCUID()}`,
				}
			);
			await axiosFetch.post(`/api/supabase/member`, {
				userId: userId,
				projectId: newProject.id,
				role: 'owner',
			});
			const newCurrentProject = await axiosFetch.get<FetchProjectResponse>(
				`/api/supabase/project/${newProject.id}`
			);
			setCurrentProject(newCurrentProject);
		} else {
			console.error('IPC is not available');
		}
	};

	const handleFetchUserProjects = async ({
		userId,
	}: handleFetchUserProjectsProps): Promise<void> => {
		const userProjects = await axiosFetch.get<FetchUserProjectsResponse[]>(
			`/api/supabase/project/user/${userId}`
		);
		setUserProjects(userProjects);
	};

	const handleStartProject = ({ project }: handleStartProjectProps): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-start');
			setWindowMode('edit');
			setCurrentProject(project);
		} else {
			console.error('IPC is not available');
		}
	};

	return {
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,

		handleCreateProject,
		handleFetchUserProjects,
		handleStartProject,
	};
};
