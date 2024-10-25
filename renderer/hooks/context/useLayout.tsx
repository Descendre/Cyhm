'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import { UseLayoutProps } from '../../interfaces';

export const useLayout = (): UseLayoutProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}
	const { windowMode, setWindowMode } = context;
	return {
		windowMode,
		setWindowMode,
	};
};
