import { ColumnConstraintType, SqliteClauseType } from '@prisma/client';

export interface AddColumnConstraintRequest {
	columnId: string;
	type: ColumnConstraintType;
	sqliteClauseType?: SqliteClauseType;
	primaryKeyIdToForeignKeyId: string | null;
}
