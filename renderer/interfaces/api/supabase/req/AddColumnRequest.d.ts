import { DBType, SQliteColumnType } from '@prisma/client';

export interface AddColumnRequest {
	name: string;
	dbType: DBType;
	type: SQliteColumnType;
	tableId: string;
}
