import { windowModeProps } from '../provider';

export interface UseLayoutProps {
	windowMode: windowModeProps;
	setWindowMode: React.Dispatch<React.SetStateAction<windowModeProps | null>>;
}
