import { ColumnConstraintType, DBType, SqliteClauseType } from '@prisma/client';

export interface AddColumnConstraintRequest {
	columnId: string;
	dbType: DBType;
	type: ColumnConstraintType;
	sqliteClauseType?: SqliteClauseType;
}
