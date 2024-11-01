import { AddTableResponse } from '../../../api';

export interface EditRightPopperSketchPickerProps {
	open: boolean;
	anchorEl: HTMLElement | null;
	popperRef: React.RefObject<HTMLDivElement | null>;
	table: AddTableResponse;
}
