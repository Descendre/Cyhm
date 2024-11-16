import { ReactElement, ReactNode } from 'react';

export interface AppSelectModalProps {
	isOpen: boolean;
	outerClose?: boolean;
	closeModal: () => void;
	acceptFunc: () => void;
	rejectFunc: () => void;
	children: ReactNode;
	acceptColor:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'error'
		| 'warning'
		| 'info'
		| 'success';
	rejectColor:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'error'
		| 'warning'
		| 'info'
		| 'success';
	acceptIcon?: ReactElement;
	rejectIcon?: ReactElement;
	acceptText: string;
	rejectText: string;
	loading?: boolean;
}
