'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import { axiosFetch } from '../../libs';
import { generateCUID } from '../../utils';
import {
	CreateProjectResponse,
	handleCreateProjectProps,
	UseProjectProps,
} from '../../interfaces';

export const useProject = (): UseProjectProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { setWindowMode } = context;

	const handleCreateProject = async ({
		userId,
	}: handleCreateProjectProps): Promise<void> => {
		if (typeof window !== 'undefined' && window.ipc) {
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
			setWindowMode('edit');
			window.ipc.send('project-start');
		} else {
			console.error('IPC is not available');
		}
	};

	return {
		handleCreateProject,
	};
};
