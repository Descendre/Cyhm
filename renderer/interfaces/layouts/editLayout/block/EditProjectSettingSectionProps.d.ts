import { ReactElement, ReactNode } from 'react';

export interface EditProjectSettingSectionProps {
	title: string;
	icon: ReactElement;
	color:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'error'
		| 'warning'
		| 'info'
		| 'success';
	children: ReactNode;
}
