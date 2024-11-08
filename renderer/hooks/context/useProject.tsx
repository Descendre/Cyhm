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
	UpdateTablePositionResponse,
	UseProjectProps,
} from '../../interfaces';
import { usePalette } from '../common';
import { ColumnType } from '@prisma/client';

export const useProject = (): UseProjectProps => {
	const palette = usePalette();
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
		setIsPreparingProject,
		tableEditInfo,
		setTableEditInfo,
		columnEditInfo,
		setColumnEditInfo,
		setInvitedUsers,
		setIsMic,
		setIsAudio,
		setSelectedTableId,
		setLastSelectedTableId,
		setIsEditLeftBar,
		setIsEditRightPopper,
		setUserSearchResults,
		setUserPopperViewMode,
		channel,
		setChannel,
	} = context;

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
						projectId: tableData.projectId,
						position: tableData.position,
						id: tableData.id,
						isExpanded: tableData.isExpanded,
						isEditing: tableData.isEditing,
						createdAt: tableData.createdAt,
						updatedAt: tableData.updatedAt,
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
		setCurrentProject(null);
		setTables(null);
		setColumns(null);
		setIsMic(false);
		setIsAudio(false);
		setSelectedTableId(null);
		setLastSelectedTableId(null);
		setIsEditLeftBar(true);
		setIsEditRightPopper(true);
		setTableEditInfo(null);
		setColumnEditInfo(null);
		setUserSearchResults({
			invite: {
				result: [],
				query: '',
			},
		});
		setUserPopperViewMode('member');
		setInvitedUsers(null);
		setChannel(null);
		setWindowMode('top');
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-end');
		} else {
			console.error('IPC is not available');
		}
	};

	const handleAddTable = async ({
		projectId,
		tableName,
	}: handleAddTableProps): Promise<void> => {
		if (!channel) return;
		setIsTableAddMode(false);

		const tempCUID = generateCUID();

		setTables((prevTables) => {
			const tempTable: AddTableResponse = {
				id: tempCUID,
				projectId: projectId,
				color: palette.components.edit.reactFlow.tableHeader.default,
				name: tableName,
				position: {
					x: 0,
					y: 0,
				},
				isEditing: false,
				isExpanded: true,
			};
			return {
				...(prevTables || {}),
				[tempCUID]: tempTable,
			};
		});
		setTableEditInfo((prevInfo) => {
			const tempInfo: AddTableResponse = {
				id: tempCUID,
				projectId: projectId,
				color: palette.components.edit.reactFlow.tableHeader.default,
				name: tableName,
				position: {
					x: 0,
					y: 0,
				},
				isEditing: false,
				isExpanded: true,
			};
			return {
				...(prevInfo || {}),
				[tempCUID]: tempInfo,
			};
		});

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

		setTables((prevTables) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [tempCUID]: _, ...restTables } = prevTables || {};
			return {
				...restTables,
				[newTable.id]: newTable,
			};
		});
		setTableEditInfo((prevInfo) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [tempCUID]: _, ...restTables } = prevInfo || {};
			return {
				...restTables,
				[newTable.id]: newTable,
			};
		});

		channel.send({
			type: 'broadcast',
			event: 'table_add',
			payload: {
				newTable: newTable,
			} as TableChannelPayloadProps,
		});
	};

	const handleAddColumn = async ({
		name,
		tableId,
	}: handleAddColumnProps): Promise<void> => {
		try {
			if (!channel || !tables[tableId]?.isEditing) return;
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

			channel.send({
				type: 'broadcast',
				event: 'column_add',
				payload: {
					newColumn: newColumn,
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
			if (!tables || !tables[tableId] || !channel) return;
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

			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
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
			if (!tables || !tables[tableId] || !channel) return;
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

			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
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
			if (tables[tableId].name === tableEditInfo[tableId].name || !channel)
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

			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
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
			if (tables[tableId].color === tableEditInfo[tableId].color || !channel)
				return;
			setTables((prevTables) => {
				if (!prevTables || !prevTables[tableId]) return prevTables;
				return {
					...prevTables,
					[tableId]: {
						...prevTables[tableId],
						color: color,
					},
				};
			});
			const updatedTable = await axiosFetch.put<AddTableResponse>(
				`/api/supabase/table/color`,
				{
					tableId: tableId,
					color: color,
				} as UpdateTableColorRequest
			);

			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
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
			if (!channel) return;

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

			channel.send({
				type: 'broadcast',
				event: 'column_update',
				payload: {
					newColumn: updatedColumn,
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
			if (!channel) return;

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

			channel.send({
				type: 'broadcast',
				event: 'column_update',
				payload: {
					newColumn: updatedColumn,
				} as ColumnChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleNodeDragStop = async ({ node }: handleNodeDragStopProps) => {
		try {
			if (!channel) return;
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

			channel.send({
				type: 'broadcast',
				event: 'table_update',
				payload: {
					newTable: updatedTable,
				} as TableChannelPayloadProps,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!currentProject || channel) return;
		const newChannel = supabase.channel(`project_${currentProject.id}`);
		setChannel(newChannel);

		const handleTableAdd = (payload: { payload: TableChannelPayloadProps }) => {
			const { newTable } = payload.payload;
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
			console.log(1234);
			const { newTable } = payload.payload;
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
			const { newColumn } = payload.payload;
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
			const { newColumn } = payload.payload;
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
		newChannel
			.on('broadcast', { event: 'table_add' }, handleTableAdd)
			.on('broadcast', { event: 'table_update' }, handleTableUpdate)
			.on('broadcast', { event: 'column_add' }, handleColumnAdd)
			.on('broadcast', { event: 'column_update' }, handleColumnUpdate)
			.subscribe();

		return () => {
			newChannel.unsubscribe();
			setChannel(null);
		};
	}, [currentProject]); // eslint-disable-line

	return {
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
		tableEditInfo,
		setTableEditInfo,
		columnEditInfo,
		setColumnEditInfo,
		channel,
		setChannel,

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
