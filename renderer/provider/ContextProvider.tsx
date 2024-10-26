'use client';
import { ReactNode, createContext, useState } from 'react';
import { ContextProviderProps, windowModeProps } from '../interfaces';

export const Context = createContext<ContextProviderProps | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [windowMode, setWindowMode] = useState<windowModeProps>('top');
	const [isMic, setIsMic] = useState<boolean>(false);
	const [isPinned, setIsPinned] = useState<boolean>(false);

	const contextValue = {
		windowMode,
		setWindowMode,
		isMic,
		setIsMic,
		isPinned,
		setIsPinned,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
