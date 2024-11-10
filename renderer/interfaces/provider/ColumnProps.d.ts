import { AddColumnResponse } from '../api';

export interface ColumnStatePropsExtended extends AddColumnResponse {
	isConstraintExpand: boolean;
}

export type ColumnsStateProps = { [key: string]: ColumnStatePropsExtended[] };
