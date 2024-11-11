import { DBType } from '@prisma/client';

export interface CreateProjectRequest {
	name: string;
	dbType: DBType;
}
