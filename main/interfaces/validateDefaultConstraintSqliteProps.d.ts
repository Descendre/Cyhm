import { ColumnStatePropsExtended } from '../../renderer/interfaces';

export interface validateDefaultConstraintSqliteProps {
	column: ColumnStatePropsExtended;
	value: string;
}

export interface validateDefaultConstraintSqliteReturn {
	message: string;
}
