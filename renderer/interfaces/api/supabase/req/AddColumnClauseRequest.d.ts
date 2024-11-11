import { DBType, SqliteClauseType } from '@prisma/client';

export interface AddColumnClauseRequest {
	constraintId: string;
	dbType: DBType;
	clause: SqliteClauseType;
}
