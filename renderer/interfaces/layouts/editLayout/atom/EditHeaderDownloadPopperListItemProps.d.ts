import { ReactElement } from 'react';

export interface EditHeaderDownloadPopperListItemProps {
	primary: string;
	secondary: string;
	icon: ReactElement;
	onClick: () => void;
}
