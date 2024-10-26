export type ColumnConstraintProps =
	| 'PRIMARY_KEY'
	| 'UNIQUE'
	| 'NOT_NULL'
	| 'FOREIGN_KEY'
	| CheckConstraintProps
	| DefaultConstraintProps;

interface DefaultConstraintProps {
	type: 'DEFAULT';
	value: string;
}

interface CheckConstraintProps {
	type: 'CHECK';
	condition: string;
}
