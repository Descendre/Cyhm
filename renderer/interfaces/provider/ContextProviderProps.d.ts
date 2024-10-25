export interface ContextProviderProps {
	windowMode: windowModeProps;
	setWindowMode: React.Dispatch<React.SetStateAction<windowModeProps | null>>;
}

export type windowModeProps = 'top' | 'login';
