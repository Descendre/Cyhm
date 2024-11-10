import { ReactNode } from 'react';
import { AddTableResponse } from '../../../api';
import { ColumnStatePropsExtended } from '../../../provider';

export interface EditColumnConstraintColumnSectionProps {
	children: ReactNode;
	table: AddTableResponse;
	column: ColumnStatePropsExtended;
}
