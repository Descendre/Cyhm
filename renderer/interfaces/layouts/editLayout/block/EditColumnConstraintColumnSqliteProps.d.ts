import { ColumnConstraintType } from '@prisma/client';
import { ColumnStatePropsExtended } from '../../../provider';
import { ColumnConstraintResponse } from '../../../api';

export interface EditColumnConstraintColumnSqliteProps {
	type: ColumnConstraintType;
	column: ColumnStatePropsExtended;
	constraint: ColumnConstraintResponse;
}
