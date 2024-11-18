import { ColumnConstraintType, SqliteClauseType } from '@prisma/client';

export interface AddColumnConstraintRequest {
	columnId: string;
	type: ColumnConstraintType;
	value?: string;
	sqliteClauseType?: SqliteClauseType;
	primaryKeyId?: string;
}
