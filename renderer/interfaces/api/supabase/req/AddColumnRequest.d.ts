import { DBType } from '@prisma/client';

export interface AddColumnRequest {
	name: string;
	dbType: DBType;
	tableId: string;
	projectId: string;
}
