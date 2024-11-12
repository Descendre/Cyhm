import { AddTableResponse } from '../../../api';
import { ColumnStatePropsExtended } from '../../../provider';

export interface EditRightPopperAddColumnConstraintButtonProps {
	table: AddTableResponse;
	column: ColumnStatePropsExtended;
	openModal: (modalName: string) => void;
}
