'use client';
import { ReactNode, createContext, useState } from 'react';
import {
	ColumnsStateProps,
	ContextProviderProps,
	TablesStateProps,
	windowModeProps,
} from '../interfaces';
import { Edge, Node } from '@xyflow/react';

export const Context = createContext<ContextProviderProps | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [windowMode, setWindowMode] = useState<windowModeProps>('top');
	const [isMic, setIsMic] = useState<boolean>(false);
	const [isAudio, setIsAudio] = useState<boolean>(false);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [tables, setTables] = useState<TablesStateProps>(null);
	const [columns, setColumns] = useState<ColumnsStateProps>(null);
	const [isTableAddMode, setIsTableAddMode] = useState<boolean>(false);

	const contextValue = {
		windowMode,
		setWindowMode,
		isMic,
		setIsMic,
		isAudio,
		setIsAudio,
		nodes,
		setNodes,
		edges,
		setEdges,
		tables,
		setTables,
		columns,
		setColumns,
		isTableAddMode,
		setIsTableAddMode,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
