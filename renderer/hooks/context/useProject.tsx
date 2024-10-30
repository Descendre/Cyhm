'use client';
import { useContext, useEffect } from 'react';
import { Context } from '../../provider';
import { axiosFetch, supabase } from '../../libs';
import { generateCUID } from '../../utils';
import {
	AddColumnResponse,
	AddTableResponse,
	ColumnChannelPayloadProps,
	CreateProjectResponse,
	FetchAllContentsResponse,
	FetchProjectResponse,
	FetchUserProjectsResponse,
	handleAddColumnProps,
	handleAddTableProps,
	handleCreateProjectProps,
	handleFetchUserProjectsProps,
	handleOpenTableExpansionProps,
	handleStartProjectProps,
	TableChannelPayloadProps,
	UseProjectProps,
} from '../../interfaces';
import { usePalette } from '../common';
import { useSession } from 'next-auth/react';
import { ColumnType } from '@prisma/client';

export const useProject = (): UseProjectProps => {
	const palette = usePalette();
	const { data: session } = useSession();
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const {
		setTables,
		setColumns,
		setIsTableAddMode,
		setAddColumnIndex,
		setWindowMode,
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
		isSubscribed,
		setIsSubscribed,
		setIsPreparingProject,
	} = context;

	const SUPABASE_CHANNEL_NAME = `project_${currentProject?.id}`;

	const handleCreateProject = async ({
		userId,
	}: handleCreateProjectProps): Promise<void> => {
		try {
			setIsPreparingProject('プロジェクトの作成中...');
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
			if (typeof window !== 'undefined' && window.ipc) {
				window.ipc.send('project-start');
			} else {
				console.error('IPC is not available');
			}
			setWindowMode('edit');
			setIsPreparingProject(null);
		} catch (error) {
			console.error(error);
			setIsPreparingProject(null);
		}
	};

	const handleFetchUserProjects = async ({
		userId,
	}: handleFetchUserProjectsProps): Promise<void> => {
		try {
			const userProjects = await axiosFetch.get<FetchUserProjectsResponse[]>(
				`/api/supabase/project/user/${userId}`
			);
			setUserProjects(userProjects);
		} catch (error) {
			console.error(error);
		}
	};

	const handleStartProject = async ({
		project,
	}: handleStartProjectProps): Promise<void> => {
		try {
			setIsPreparingProject('プロジェクトを起動中...');
			const allProjectContents = await axiosFetch.get<FetchAllContentsResponse>(
				`/api/supabase/project/allContents/${project.id}`
			);
			setTables(allProjectContents.tables);
			setColumns(allProjectContents.columns);
			setCurrentProject(project);
			setWindowMode('edit');
			if (typeof window !== 'undefined' && window.ipc) {
				window.ipc.send('project-start');
			} else {
				console.error('IPC is not available');
			}
			setIsPreparingProject(null);
		} catch (error) {
			console.error(error);
			setIsPreparingProject(null);
		}
	};

	const handleEndProject = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-end');
		} else {
			console.error('IPC is not available');
		}
		setWindowMode('top');
		setCurrentProject(null);
		setTables(null);
		setColumns(null);
	};

	const handleAddTable = async ({
		projectId,
		tableName,
	}: handleAddTableProps): Promise<void> => {
		setIsTableAddMode(false);
		if (!session.user) return;
		const newTable = await axiosFetch.post<AddTableResponse>(
			`/api/supabase/table`,
			{
				projectId: projectId,
				tableName: tableName,
				color: palette.components.edit.reactFlow.tableHeader.default,
				position: {
					x: 200,
					y: 300,
				},
			}
		);
		setTables((prevTables) => ({
			...prevTables,
			[newTable.id]: newTable,
		}));
		const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
		channel.send({
			type: 'broadcast',
			event: 'table_add',
			payload: {
				newTable: newTable,
				userId: session.user.id,
			} as TableChannelPayloadProps,
		});
	};

	const handleAddColumn = async ({
		name,
		tableId,
	}: handleAddColumnProps): Promise<void> => {
		if (!session.user) return;
		const newColumn = await axiosFetch.post<AddColumnResponse>(
			`/api/supabase/column`,
			{
				name: name,
				type: 'INT' as ColumnType,
				tableId: tableId,
			}
		);
		setColumns((prevColumns) => ({
			...prevColumns,
			[newColumn.tableId]: [...(prevColumns[tableId] || []), newColumn],
		}));
		setAddColumnIndex(null);
		handleOpenTableExpansion({ tableId: tableId });
		const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
		channel.send({
			type: 'broadcast',
			event: 'column_add',
			payload: {
				newColumn: newColumn,
				userId: session.user.id,
			} as ColumnChannelPayloadProps,
		});
	};

	const handleOpenTableExpansion = ({
		tableId,
	}: handleOpenTableExpansionProps): void => {
		setTables((prevTables) => {
			if (!prevTables || !prevTables[tableId]) return prevTables;
			return {
				...prevTables,
				[tableId]: {
					...prevTables[tableId],
					isExpanded: true,
				},
			};
		});
	};

	useEffect(() => {
		if (!currentProject || isSubscribed || !session.user) return;
		setIsSubscribed(true);
		const channel = supabase.channel(SUPABASE_CHANNEL_NAME);

		const handleTableAdd = (payload: { payload: TableChannelPayloadProps }) => {
			const { newTable, userId } = payload.payload;
			if (userId === session.user.id) return;
			setTables((prevTables) => ({
				...prevTables,
				[newTable.id]: newTable,
			}));
		};

		const handleTableUpdate = (payload: {
			payload: TableChannelPayloadProps;
		}) => {
			const { newTable, userId } = payload.payload;
			if (userId === session.user.id) return;
			setTables((prevTables) => ({
				...prevTables,
				[newTable.id]: newTable,
			}));
		};

		const handleColumnAdd = (payload: {
			payload: ColumnChannelPayloadProps;
		}) => {
			const { newColumn, userId } = payload.payload;
			if (userId === session.user.id) return;
			setColumns((prevColumns) => ({
				...prevColumns,
				[newColumn.id]: [...(prevColumns[newColumn.id] || []), newColumn],
			}));
		};

		const handleColumnUpdate = (payload: {
			payload: ColumnChannelPayloadProps;
		}) => {
			const { newColumn, userId } = payload.payload;
			if (userId === session.user.id) return;
			setColumns((prevColumns) => ({
				...prevColumns,
				[newColumn.id]: [...(prevColumns[newColumn.id] || []), newColumn],
			}));
		};
		channel
			.on('broadcast', { event: 'table_add' }, handleTableAdd)
			.on('broadcast', { event: 'table_update' }, handleTableUpdate)
			.on('broadcast', { event: 'column_add' }, handleColumnAdd)
			.on('broadcast', { event: 'column_update' }, handleColumnUpdate)
			.subscribe();
		return () => {
			channel.unsubscribe();
			setIsSubscribed(false);
		};
	}, []); // eslint-disable-line

	return {
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
		isSubscribed,
		setIsSubscribed,

		handleCreateProject,
		handleFetchUserProjects,
		handleStartProject,
		handleEndProject,
		handleAddTable,
		handleAddColumn,
		handleOpenTableExpansion,
	};
};
