export interface EditRightPopperSketchPickerProps {
	open: boolean;
	anchorEl: HTMLElement | null;
	onClose: () => void;
	parentRef: React.RefObject<HTMLElement | null>;
}
