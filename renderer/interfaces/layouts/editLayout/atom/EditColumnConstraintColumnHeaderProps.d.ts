import { AddTableResponse } from '../../../api';
import { ColumnStatePropsExtended } from '../../../provider';

export interface EditColumnConstraintColumnHeaderProps {
	table: AddTableResponse;
	column: ColumnStatePropsExtended;
}
