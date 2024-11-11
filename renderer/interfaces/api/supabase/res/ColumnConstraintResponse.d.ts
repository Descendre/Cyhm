import { ColumnConstraintType } from '@prisma/client';

export interface ColumnConstraintResponse {
	columnId: string;
	type: ColumnConstraintType;
	sqliteClause: $Enums.SqliteClauseType | null;
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
