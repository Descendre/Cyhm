import { ColumnConstraintResponse } from '../../../api';
import { ColumnStatePropsExtended } from '../../../provider';

export interface EditColumnConstraintSqlitePrimaryKeySelectProps {
	column: ColumnStatePropsExtended;
	constraint: ColumnConstraintResponse;
}
