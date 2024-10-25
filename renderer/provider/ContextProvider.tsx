'use client';
import { ReactNode, createContext, useState } from 'react';
import { ContextProviderProps, windowModeProps } from '../interfaces';

export const Context = createContext<ContextProviderProps | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [windowMode, setWindowMode] = useState<windowModeProps>('top');
	const contextValue = {
		windowMode,
		setWindowMode,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
