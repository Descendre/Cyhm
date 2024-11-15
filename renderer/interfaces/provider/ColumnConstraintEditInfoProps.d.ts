import { ColumnConstraintType, SqliteClauseType } from '@prisma/client';

export interface ColumnConstraintEditInfoProps {
	columnId: string;
	columnConstraintType: ColumnConstraintType | null;
	clauseType: SqliteClauseType | null;
	primaryKeyIdToForeignKey: string | null;
}
