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
	handleColumnNameChangeProps,
	handleColumnNameUpdateProps,
	handleCreateProjectProps,
	handleFetchUserProjectsProps,
	handleNodeDragStopProps,
	handleOpenTableExpansionProps,
	handleStartProjectProps,
	handleTableColorChangeProps,
	handleTableColorUpdateProps,
	handleTableEditProps,
	handleTableNameChangeProps,
	handleTableNameUpdateProps,
	handleUpdateColumnTypeProps,
	TableChannelPayloadProps,
	UpdateColumnNameRequest,
	UpdateColumnTypeRequest,
	UpdateTableColorRequest,
	UpdateTableExpandRequest,
	UpdateTableLockRequest,
	UpdateTableNameRequest,
	UseProjectProps,
} from '../../interfaces';
import { usePalette } from '../common';
import { useSession } from 'next-auth/react';
import { ColumnType } from '@prisma/client';
import { UpdateTablePositionResponse } from '../../interfaces/api/supabase/res/UpdateTablePositionResponse';

export const useProject = (): UseProjectProps => {
	const palette = usePalette();
	const { data: session } = useSession();
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const {
		tables,
		setTables,
		columns,
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
		tableEditInfo,
		setTableEditInfo,
		columnEditInfo,
		setColumnEditInfo,
		setInvitedUsers,
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
					name: `プロジェクト_${generateCUID()}`,
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
			setInvitedUsers(allProjectContents.invitedUsers);
			setCurrentProject(project);
			setWindowMode('edit');

			setTableEditInfo((prevState) => {
				const updatedTableInfo = { ...prevState };
				Object.keys(allProjectContents.tables).forEach((tableId) => {
					const tableData = allProjectContents.tables[tableId];
					updatedTableInfo[tableId] = {
						name: tableData.name,
						color: tableData.color,
					};
				});
				return updatedTableInfo;
			});

			setColumnEditInfo((prevState) => {
				const updatedColumnInfo = { ...prevState };
				Object.keys(allProjectContents.columns).forEach((tableId) => {
					const columns = allProjectContents.columns[tableId];
					// 新しくオブジェクトを生成しないとなぜかcolumnEditInfoとcolumnsの内容が同期する模様
					// 原因不明
					// ChatGPTによると「setColumnEditInfo の中で、状態を更新する際にオブジェクトの参照が共有されてしまう問題は、JavaScriptのオブジェクトが参照型であることに起因しています。具体的には、元のオブジェクトを直接コピーすると、両者が同じ参照を持つため、一方の変更が他方に影響を及ぼすことがあります。」
					updatedColumnInfo[tableId] = columns.map((column) => ({
						id: column.id,
						name: column.name,
						tableId: column.tableId,
						type: column.type,
						createdAt: column.createdAt,
						updatedAt: column.updatedAt,
					}));
				});
				return updatedColumnInfo;
			});

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
		setCurrentProject(null);
		setTables(null);
		setColumns(null);
		setWindowMode('top');
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
					x: 0,
					y: 0,
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
		try {
			if (!session.user) return;
			setAddColumnIndex(null);

			const tempCUID = generateCUID();
			setColumns((prevColumns) => {
				const newColumn: AddColumnResponse = {
					id: tempCUID,
					name: name,
					tableId: tableId,
					type: 'INT',
				};
				if (!prevColumns) {
					return {
						...prevColumns,
						[tableId]: [newColumn],
					};
				}
				const prevTableColumns = prevColumns[tableId] || [];
				return {
					...prevColumns,
					[tableId]: [...prevTableColumns, newColumn],
				};
			});
			setColumnEditInfo((prevInfo) => {
				const newInfo: AddColumnResponse = {
					id: tempCUID,
					name: name,
					tableId: tableId,
					type: 'INT',
				};
				if (!prevInfo) {
					return {
						...prevInfo,
						[tableId]: [newInfo],
					};
				}
				const prevColumnEditInfo = prevInfo[tableId] || [];
				return {
					...prevInfo,
					[tableId]: [...prevColumnEditInfo, newInfo],
				};
			});

			const newColumn = await axiosFetch.post<AddColumnResponse>(
				`/api/supabase/column`,
				{
					name: name,
					type: 'INT' as ColumnType,
					tableId: tableId,
				}
			);

			handleOpenTableExpansion({ tableId: tableId });

			setColumns((prevColumns) => ({
				...prevColumns,
				[tableId]: prevColumns[tableId].map((col) =>
					col.id === tempCUID ? newColumn : col
				),
			}));
			setColumnEditInfo((prevInfo) => ({
				...prevInfo,
				[tableId]: prevInfo[tableId].map((col) =>
					col.id === tempCUID
						? {
								id: newColumn.id,
								name: newColumn.name,
								tableId: newColumn.tableId,
								type: newColumn.type,
								createdAt: newColumn.createdAt,
								updatedAt: newColumn.updatedAt,
							}
						: col
				),
			}));

			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'column_add',
				payload: {
					newColumn: newColumn,
					userId: session.user.id,
				} as ColumnChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
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

	const handleTableExpansion = async ({
		tableId,
	}: handleOpenTableExpansionProps): Promise<void> => {
		try {
			if (!tables || !tables[tableId]) return;
			setTables((prevTables) => {
				if (!prevTables || !prevTables[tableId]) return prevTables;
				return {
					...prevTables,
					[tableId]: {
						...prevTables[tableId],
						isExpanded: !prevTables[tableId].isExpanded,
					},
				};
			});
			const updatedTable = await axiosFetch.put<AddTableResponse>(
				`/api/supabase/table/expand`,
				{
					tableId: tableId,
					isExpand: !tables[tableId].isExpanded,
				} as UpdateTableExpandRequest
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
					userId: session.user.id,
				} as TableChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleTableEditMode = async ({
		tableId,
	}: handleTableEditProps): Promise<void> => {
		try {
			if (!tables || !tables[tableId] || !session.user) return;
			setTables((prevTables) => {
				if (!prevTables || !prevTables[tableId]) return prevTables;
				return {
					...prevTables,
					[tableId]: {
						...prevTables[tableId],
						isEditing: !prevTables[tableId].isEditing,
					},
				};
			});
			const updatedTable = await axiosFetch.put<AddTableResponse>(
				`/api/supabase/table/lock`,
				{
					tableId: tableId,
					isEdit: !tables[tableId].isEditing,
				} as UpdateTableLockRequest
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
					userId: session.user.id,
				} as TableChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleTableNameChange = ({
		tableId,
		event,
	}: handleTableNameChangeProps) => {
		setTableEditInfo((prevState) => ({
			...prevState,
			[tableId]: {
				...prevState[tableId],
				name: event.target.value,
			},
		}));
	};

	const handleTableNameUpdate = async ({
		tableId,
		name,
	}: handleTableNameUpdateProps): Promise<void> => {
		try {
			if (!session.user || tables[tableId].name === tableEditInfo[tableId].name)
				return;
			setTables((prevTables) => {
				if (!prevTables || !prevTables[tableId]) return prevTables;
				return {
					...prevTables,
					[tableId]: {
						...prevTables[tableId],
						name: name,
					},
				};
			});
			const updatedTable = await axiosFetch.put<AddTableResponse>(
				`/api/supabase/table/name`,
				{
					tableId: tableId,
					name: name,
				} as UpdateTableNameRequest
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
					userId: session.user.id,
				} as TableChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleTableColorChange = ({
		tableId,
		color,
	}: handleTableColorChangeProps) => {
		setTableEditInfo((prevState) => ({
			...prevState,
			[tableId]: {
				...prevState[tableId],
				color: color,
			},
		}));
	};

	const handleTableColorUpdate = async ({
		tableId,
		color,
	}: handleTableColorUpdateProps): Promise<void> => {
		try {
			if (
				!session.user ||
				tables[tableId].color === '#' + tableEditInfo[tableId].color
			)
				return;
			setTables((prevTables) => {
				if (!prevTables || !prevTables[tableId]) return prevTables;
				return {
					...prevTables,
					[tableId]: {
						...prevTables[tableId],
						color: '#' + color,
					},
				};
			});
			const updatedTable = await axiosFetch.put<AddTableResponse>(
				`/api/supabase/table/color`,
				{
					tableId: tableId,
					color: '#' + color,
				} as UpdateTableColorRequest
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
					userId: session.user.id,
				} as TableChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleColumnNameChange = ({
		tableId,
		columnId,
		name,
	}: handleColumnNameChangeProps) => {
		setColumnEditInfo((prevState) => {
			const updatedState = { ...prevState };
			const columnArray = updatedState[tableId];
			const columnToUpdate = columnArray.find(
				(column) => column.id === columnId
			);
			if (columnToUpdate) {
				columnToUpdate.name = name;
			}
			return updatedState;
		});
	};

	const handleColumnNameUpdate = async ({
		tableId,
		columnId,
		name,
	}: handleColumnNameUpdateProps): Promise<void> => {
		try {
			if (!session.user) return;

			const currentColumn = columns[tableId]?.find(
				(column) => column.id === columnId
			);
			if (!currentColumn || currentColumn.name === name) return;

			setColumns((prevState) => {
				const updatedState = { ...prevState };
				const columnArray = updatedState[tableId];
				const columnToUpdate = columnArray.find(
					(column) => column.id === columnId
				);
				if (columnToUpdate) {
					columnToUpdate.name = name;
				}
				return updatedState;
			});
			const updatedColumn = await axiosFetch.put<AddColumnResponse>(
				`/api/supabase/column/name`,
				{
					columnId: columnId,
					name: name,
				} as UpdateColumnNameRequest
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'column_update',
				payload: {
					newColumn: updatedColumn,
					userId: session.user.id,
				} as ColumnChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateColumnType = async ({
		tableId,
		columnId,
		type,
	}: handleUpdateColumnTypeProps): Promise<void> => {
		try {
			if (!session.user) return;

			const currentColumn = columns[tableId]?.find(
				(column) => column.id === columnId
			);
			if (!currentColumn || currentColumn.type === type) {
				return;
			}

			setColumns((prevState) => {
				const updatedState = { ...prevState };
				const columnIndex = updatedState[tableId].findIndex(
					(col) => col.id === columnId
				);
				if (columnIndex !== -1) {
					updatedState[tableId][columnIndex].type = type;
				}
				return updatedState;
			});

			const updatedColumn = await axiosFetch.put<AddColumnResponse>(
				`/api/supabase/column/type`,
				{
					columnId: columnId,
					type: type,
				} as UpdateColumnTypeRequest
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'column_update',
				payload: {
					newColumn: updatedColumn,
					userId: session.user.id,
				} as ColumnChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleNodeDragStop = async ({ node }: handleNodeDragStopProps) => {
		try {
			const { id, position } = node;
			setTables((prevTables) => {
				if (!prevTables || !prevTables[id]) return prevTables;
				return {
					...prevTables,
					[id]: {
						...prevTables[id],
						position: position,
					},
				};
			});
			const updatedTable = await axiosFetch.put<UpdateTablePositionResponse>(
				'/api/supabase/table/position',
				{
					tableId: id,
					position: position,
				}
			);
			const channel = supabase.channel(SUPABASE_CHANNEL_NAME);
			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
					userId: session.user.id,
				} as TableChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
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
			setTableEditInfo((prevTableInfo) => ({
				...prevTableInfo,
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
			setTableEditInfo((prevTableInfo) => ({
				...prevTableInfo,
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
				[newColumn.tableId]: [
					...(prevColumns[newColumn.tableId] || []),
					newColumn,
				],
			}));
			setColumnEditInfo((prevColumns) => ({
				...prevColumns,
				[newColumn.tableId]: [
					...(prevColumns[newColumn.tableId] || []),
					{
						id: newColumn.id,
						tableId: newColumn.tableId,
						name: newColumn.name,
						type: newColumn.type,
						createdAt: newColumn.createdAt,
						updatedAt: newColumn.updatedAt,
					},
				],
			}));
		};

		const handleColumnUpdate = (payload: {
			payload: ColumnChannelPayloadProps;
		}) => {
			const { newColumn, userId } = payload.payload;
			if (userId === session.user.id) return;
			setColumns((prevColumns) => ({
				...prevColumns,
				[newColumn.tableId]: prevColumns[newColumn.tableId].map((column) =>
					column.id === newColumn.id ? { ...newColumn } : column
				),
			}));
			setColumnEditInfo((prevColumns) => ({
				...prevColumns,
				[newColumn.tableId]: prevColumns[newColumn.tableId].map((column) =>
					column.id === newColumn.id
						? {
								id: newColumn.id,
								tableId: newColumn.tableId,
								name: newColumn.name,
								type: newColumn.type,
								createdAt: newColumn.createdAt,
								updatedAt: newColumn.updatedAt,
							}
						: column
				),
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
		tableEditInfo,
		setTableEditInfo,
		columnEditInfo,
		setColumnEditInfo,

		handleCreateProject,
		handleFetchUserProjects,
		handleStartProject,
		handleEndProject,
		handleAddTable,
		handleAddColumn,
		handleOpenTableExpansion,
		handleTableEditMode,
		handleTableExpansion,
		handleTableNameChange,
		handleTableNameUpdate,
		handleTableColorChange,
		handleTableColorUpdate,
		handleColumnNameChange,
		handleColumnNameUpdate,
		handleUpdateColumnType,
		handleNodeDragStop,
	};
};
