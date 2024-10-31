import { ColumnType } from '@prisma/client';

export interface ColumnEditInfoProps {
	id: string;
	name: string;
	type: ColumnType;
}

export interface ColumnEditStateProps {
	[tableId: string]: ColumnEditInfoProps[];
}
