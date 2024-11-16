import { ColumnConstraintResponse } from '../../../api';
import { ColumnStatePropsExtended } from '../../../provider';

export interface EditColumnConstraintSqliteDeleteConstraintModalContentProps {
	column: ColumnStatePropsExtended;
	constraint: ColumnConstraintResponse;
}
