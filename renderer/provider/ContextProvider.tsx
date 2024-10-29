'use client';
import { ReactNode, createContext, useRef, useState } from 'react';
import {
	ColumnsStateProps,
	ContextProviderProps,
	TableProps,
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
	const [tables, setTables] = useState<TablesStateProps>(null);
	const [columns, setColumns] = useState<ColumnsStateProps>(null);
	const [isTableAddMode, setIsTableAddMode] = useState<boolean>(false);
	const [addColumnIndex, setAddColumnIndex] = useState<string | null>(null);
	const [selectedTable, setSelectedTable] = useState<TableProps | null>(null);
	const [isEditLeftBar, setIsEditLeftBar] = useState<boolean>(true);
	const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);

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
		isCreatingProject,
		setIsCreatingProject,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
