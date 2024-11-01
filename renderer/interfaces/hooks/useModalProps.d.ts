export interface UseModalProps {
	isOpen: (key: string) => boolean;
	openModal: (key: string) => void;
	closeModal: (key: string) => void;
	toggleModal: (key: string) => void;
}

export interface UseModalStateProps {
	[key: string]: boolean;
}
