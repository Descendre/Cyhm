import { AddTableResponse } from '../../../api';

export interface EditRightPopperAddColumnConstraintButtonProps {
	table: AddTableResponse;
	openModal: (modalName: string) => void;
}