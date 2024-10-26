'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import { UseLayoutProps } from '../../interfaces';

export const useLayout = (): UseLayoutProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { windowMode, setWindowMode, isPinned, setIsPinned } = context;

	const handleStartProject = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-start');
		} else {
			console.error('IPC is not available');
		}
		setWindowMode('edit');
	};

	const handleEndProject = (): void => {
		if (typeof window !== 'undefined' && window.ipc) {
			window.ipc.send('project-end');
		} else {
			console.error('IPC is not available');
		}
		setWindowMode('top');
	};

	return {
		windowMode,
		setWindowMode,
		isPinned,
		setIsPinned,

		handleStartProject,
		handleEndProject,
	};
};
