import { ColumnConstraintType, SqliteClauseType } from '@prisma/client';

export interface ColumnConstraintResponse {
	columnId: string;
	type: ColumnConstraintType;
	id: string;
	sqliteClause: SqliteClauseType | null;
	createdAt: Date;
	updatedAt: Date;
}
