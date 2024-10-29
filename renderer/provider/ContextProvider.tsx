'use client';
import { ReactNode, createContext, useRef, useState } from 'react';
import {
	AddTableResponse,
	ColumnsStateProps,
	ContextProviderProps,
	FetchUserProjectsResponse,
	TablesStateProps,
	windowModeProps,
} from '../interfaces';

export const Context = createContext<ContextProviderProps | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const EditLeftBarTableAreaRef = useRef<HTMLDivElement | null>(null);
	const EditReactFlowAreaRef = useRef<HTMLDivElement | null>(null);
	const EditFooterAddColumnIconRef = useRef<HTMLDivElement | null>(null);

	const [windowMode, setWindowMode] = useState<windowModeProps>('top');
	const [isMic, setIsMic] = useState<boolean>(false);
	const [isAudio, setIsAudio] = useState<boolean>(false);
	const [tables, setTables] = useState<TablesStateProps>({});
	const [columns, setColumns] = useState<ColumnsStateProps>({});
	const [isTableAddMode, setIsTableAddMode] = useState<boolean>(false);
	const [addColumnIndex, setAddColumnIndex] = useState<string | null>(null);
	const [selectedTable, setSelectedTable] = useState<AddTableResponse | null>(
		null
	);
	const [isEditLeftBar, setIsEditLeftBar] = useState<boolean>(true);
	const [userProjects, setUserProjects] = useState<
		FetchUserProjectsResponse[] | null
	>(null);
	const [currentProject, setCurrentProject] =
		useState<FetchUserProjectsResponse | null>(null);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

	const contextValue = {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,

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
		isTableAddMode,
		setIsTableAddMode,
		addColumnIndex,
		setAddColumnIndex,
		selectedTable,
		setSelectedTable,
		isEditLeftBar,
		setIsEditLeftBar,
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
		isSubscribed,
		setIsSubscribed,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
