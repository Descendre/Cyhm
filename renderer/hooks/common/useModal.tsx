'use client';
import { useCallback, useState } from 'react';
import { UseModalProps, UseModalStateProps } from '../../interfaces';

export const useModal = (): UseModalProps => {
	const [modalStates, setModalStates] = useState<UseModalStateProps>({});

	const openModal = useCallback((key: string) => {
		setModalStates((prev) => ({ ...prev, [key]: true }));
	}, []);

	const closeModal = useCallback((key: string) => {
		setModalStates((prev) => ({ ...prev, [key]: false }));
	}, []);

	const toggleModal = useCallback((key: string) => {
		setModalStates((prev) => ({ ...prev, [key]: !prev[key] }));
	}, []);

	const isOpen = useCallback(
		(key: string) => {
			return !!modalStates[key];
		},
		[modalStates]
	);

	return {
		isOpen,
		openModal,
		closeModal,
		toggleModal,
	};
};
