import { ColumnConstraintProps } from './ColumnConstraintProps';
import { ColumnTypeProps } from './ColumnTypeProps';

export interface ColumnProps {
	id: string;
	name: string;
	type: ColumnTypeProps;
	constraints: ColumnConstraintProps[];
	defaultValue: string | null;
}

export type ColumnsStateProps = { [key: string]: ColumnProps[] } | null;
