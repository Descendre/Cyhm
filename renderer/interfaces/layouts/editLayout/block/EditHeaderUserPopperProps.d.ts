export interface EditHeaderUserPopperProps {
	open: boolean;
	popperRef: React.RefObject<HTMLDivElement | null>;
	anchorEl: HTMLElement | null;
	setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
