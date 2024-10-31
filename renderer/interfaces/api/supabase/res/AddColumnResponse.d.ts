import { ColumnType } from '@prisma/client';

export interface AddColumnResponse {
	name: string;
	type: ColumnType;
	tableId: string;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	constraints: ColumnConstraintProps[];
}

type ColumnConstraintProps =
	| { type: 'PRIMARY_KEY' }
	| { type: 'NOT_NULL' }
	| { type: 'UNIQUE' }
	| ForeignKeyConstraintProps
	| CheckConstraintProps
	| DefaultConstraintProps;

interface ForeignKeyConstraintProps {
	type: 'FOREIGN_KEY';
	value: string;
}

interface DefaultConstraintProps {
	type: 'DEFAULT';
	value: string;
}

interface CheckConstraintProps {
	type: 'CHECK';
	value: string;
}
