import { windowModeProps } from '../provider';

export interface UseLayoutProps {
	windowMode: windowModeProps;
	setWindowMode: React.Dispatch<React.SetStateAction<windowModeProps | null>>;
	isPinned: boolean;
	setIsPinned: React.Dispatch<React.SetStateAction<boolean>>;

	handleStartProject: () => void;
	handleEndProject: () => void;
}
