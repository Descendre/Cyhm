import { ColumnType } from '@prisma/client';

export interface UpdateColumnTypeRequest {
	columnId: string;
	type: ColumnType;
}
