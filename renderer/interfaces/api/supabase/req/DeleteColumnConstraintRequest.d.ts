import { ColumnConstraintType } from '@prisma/client';

export interface DeleteColumnConstraintRequest {
	id: string;
	type: ColumnConstraintType;
}
