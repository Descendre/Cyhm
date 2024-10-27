export type ColumnConstraintProps =
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
