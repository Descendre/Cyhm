'use client';
import { ReactNode, createContext, useRef, useState } from 'react';
import {
	ColumnConstraintEditInfoProps,
	ColumnsStateProps,
	ContextProviderProps,
	FetchNotifyInvitedUserResponse,
	FetchUserProjectsResponse,
	NotifyWithDetail,
	ProjectSettingChangingProps,
	ProjectSettingInfoProps,
	TablesStateProps,
	UserPopperViewModeProps,
	UserSearchResultsProps,
	windowModeProps,
} from '../interfaces';
import { RealtimeChannel } from '@supabase/supabase-js';

export const Context = createContext<ContextProviderProps | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const EditLeftBarTableAreaRef = useRef<HTMLDivElement | null>(null);
	const EditReactFlowAreaRef = useRef<HTMLDivElement | null>(null);
	const EditFooterAddColumnIconRef = useRef<HTMLDivElement | null>(null);
	const EditRightPopperRef = useRef<HTMLDivElement | null>(null);

	const [windowMode, setWindowMode] = useState<windowModeProps>('top');
	const [isMic, setIsMic] = useState<boolean>(false);
	const [isAudio, setIsAudio] = useState<boolean>(false);
	const [tables, setTables] = useState<TablesStateProps>({});
	const [columns, setColumns] = useState<ColumnsStateProps>({});
	const [columnConstraintEditInfo, setColumnConstraintEditInfo] =
		useState<ColumnConstraintEditInfoProps | null>(null);
	const [addConstraintColumnId, setAddConstraintColumnId] = useState<
		string | null
	>(null);
	const [constraintEditingTableId, setConstraintEditingTableId] = useState<
		string | null
	>(null);
	const [isTableAddMode, setIsTableAddMode] = useState<boolean>(false);
	const [addColumnIndex, setAddColumnIndex] = useState<string | null>(null);
	const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
	const [lastSelectedTableId, setLastSelectedTableId] = useState<string | null>(
		null
	);
	const [isEditLeftBar, setIsEditLeftBar] = useState<boolean>(true);
	const [isEditRightPopper, setIsEditRightPopper] = useState<boolean>(true);
	const [userProjects, setUserProjects] = useState<
		FetchUserProjectsResponse[] | null
	>(null);
	const [currentProject, setCurrentProject] =
		useState<FetchUserProjectsResponse | null>(null);
	const [isPreparingProject, setIsPreparingProject] = useState<string | null>(
		null
	);
	const [tableEditInfo, setTableEditInfo] = useState<TablesStateProps>({});
	const [columnEditInfo, setColumnEditInfo] = useState<ColumnsStateProps>({});
	const [userSearchResults, setUserSearchResults] =
		useState<UserSearchResultsProps>({
			invite: {
				result: [],
				query: '',
			},
		});
	const [userPopperViewMode, setUserPopperViewMode] =
		useState<UserPopperViewModeProps>('member');
	const [invitedUsers, setInvitedUsers] = useState<
		FetchNotifyInvitedUserResponse[]
	>([]);
	const [notifies, setNotifies] = useState<NotifyWithDetail[] | null>(null);
	const [channel, setChannel] = useState<RealtimeChannel | null>(null);
	const [isConstraintDeleting, setIsConstraintDeleting] =
		useState<boolean>(false);
	const [projectSettingInfo, setProjectSettingInfo] =
		useState<ProjectSettingInfoProps>({
			projectName: '',
			dbType: null,
		});
	const [projectSettingChanging, setProjectSettingChanging] =
		useState<ProjectSettingChangingProps>(null);

	const contextValue = {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,
		EditRightPopperRef,

		windowMode,
		setWindowMode,
		isMic,
		setIsMic,
		isAudio,
		setIsAudio,
		tables,
		setTables,
		columns,
		setColumns,
		columnConstraintEditInfo,
		setColumnConstraintEditInfo,
		addConstraintColumnId,
		setAddConstraintColumnId,
		constraintEditingTableId,
		setConstraintEditingTableId,
		isTableAddMode,
		setIsTableAddMode,
		addColumnIndex,
		setAddColumnIndex,
		selectedTableId,
		setSelectedTableId,
		lastSelectedTableId,
		setLastSelectedTableId,
		isEditLeftBar,
		setIsEditLeftBar,
		isEditRightPopper,
		setIsEditRightPopper,
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
		isPreparingProject,
		setIsPreparingProject,
		tableEditInfo,
		setTableEditInfo,
		columnEditInfo,
		setColumnEditInfo,
		userSearchResults,
		setUserSearchResults,
		userPopperViewMode,
		setUserPopperViewMode,
		invitedUsers,
		setInvitedUsers,
		notifies,
		setNotifies,
		channel,
		setChannel,
		isConstraintDeleting,
		setIsConstraintDeleting,
		projectSettingInfo,
		setProjectSettingInfo,
		projectSettingChanging,
		setProjectSettingChanging,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
