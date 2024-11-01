import { ReactElement, ReactNode } from 'react';

export interface AppModalProps {
	isOpen: boolean;
	closeModal: () => void;
	width: string;
	height: string;
	maxWidth?: string;
	maxHeight?: string;
	minWidth?: string;
	minHeight?: string;
	title: string;
	icon: ReactElement;
	children: ReactNode;
}
