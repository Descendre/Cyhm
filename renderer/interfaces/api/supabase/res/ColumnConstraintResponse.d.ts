import { ColumnConstraintType } from '@prisma/client';

export interface ColumnConstraintResponse {
	id: string;
	type: ColumnConstraintType;
	constraintValue: string | null;
	columnId: string;
	createdAt: Date;
	updatedAt: Date;
}
