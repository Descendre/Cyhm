import { ReactElement } from 'react';

export interface AppModalHeaderProps {
	title: string;
	icon: ReactElement;
	closeModal: () => void;
}
