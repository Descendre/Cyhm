import { DBType, SQliteColumnType } from '@prisma/client';

export interface UpdateColumnTypeRequest {
	columnId: string;
	dbType: DBType;
	type: SQliteColumnType;
}
