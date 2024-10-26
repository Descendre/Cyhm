import { ColumnConstraintProps } from './ColumnConstraintProps';
import { ColumnTypeProps } from './ColumnTypeProps';

export interface ColumnProps {
	id: string;
	name: string;
	type: ColumnTypeProps;
	constraints: ColumnConstraintProps[];
	defaultValue?: string;
}

export type ColumnsStateProps = { [key: string]: ColumnProps } | null;
