import { ColumnConstraintType, SqliteClauseType } from '@prisma/client';

export interface ColumnConstraintEditInfoProps {
	columnId: string;
	columnConstraintType: ColumnConstraintType | null;
	clauseType: SqliteClauseType | null;
	primaryKeyId: string | null;
	value: string | null;
	errorText: string | null;
}
