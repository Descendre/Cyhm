import { ReactElement } from 'react';

export interface AppIconButtonProps {
	icon: ReactElement;
	borderColor: string;
	borderHoverColor: string;
	text: string;
	onClick: () => void;
}
