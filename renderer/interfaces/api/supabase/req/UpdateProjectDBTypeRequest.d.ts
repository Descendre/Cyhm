import { DBType } from '@prisma/client';

export interface UpdateProjectDBTypeRequest {
	id: string;
	type: DBType;
}
