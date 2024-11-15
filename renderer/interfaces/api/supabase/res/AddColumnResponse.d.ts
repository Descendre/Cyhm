import { SQliteColumnType } from '@prisma/client';
import { ColumnConstraintResponse } from './ColumnConstraintResponse';

export interface AddColumnResponse {
	name: string;
	sqliteType: SQliteColumnType;
	tableId: string;
	projectId: string;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	columnConstraints: ColumnConstraintResponse[];
}
