import { ReactNode } from 'react';

export interface AppModalProps {
	isOpen: boolean;
	closeModal: () => void;
	children: ReactNode;
}
