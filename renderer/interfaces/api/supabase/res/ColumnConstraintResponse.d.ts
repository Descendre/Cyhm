import { ColumnConstraintType, SqliteClauseType } from '@prisma/client';

export interface ColumnConstraintResponse {
	columnId: string;
	type: ColumnConstraintType;
	id: string;
	value: string | null;
	sqliteClause: SqliteClauseType | null;
	createdAt: Date;
	updatedAt: Date;
	fromReferences: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		foreignKeyId: string;
		primaryKeyId: string;
	}[];
	toReferences: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		foreignKeyId: string;
		primaryKeyId: string;
	}[];
}
