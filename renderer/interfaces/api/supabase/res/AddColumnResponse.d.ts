import { ColumnType } from '@prisma/client';

export interface AddColumnResponse {
	name: string;
	type: ColumnType;
	tableId: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	constraints: ColumnConstraintProps[];
}

type ColumnConstraintProps =
	| 'PRIMARY_KEY'
	| 'NOT_NULL'
	| 'UNIQUE'
	| 'FOREIGN_KEY'
	| CheckConstraintProps
	| DefaultConstraintProps;

interface DefaultConstraintProps {
	type: 'DEFAULT';
	value: string;
}

interface CheckConstraintProps {
	type: 'CHECK';
	value: string;
}
