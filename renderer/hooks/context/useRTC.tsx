'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import { UseRTCProps } from '../../interfaces';

export const useRTC = (): UseRTCProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { isMic, setIsMic, isAudio, setIsAudio } = context;

	return {
		isMic,
		setIsMic,
		isAudio,
		setIsAudio,
	};
};
