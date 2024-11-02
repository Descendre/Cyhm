import { ColumnType } from '@prisma/client';

export const getSQLiteType = (type: ColumnType): string => {
	switch (type) {
		case 'INT':
			return 'INTEGER';
		case 'VARCHAR':
			return 'TEXT';
		case 'BOOLEAN':
			return 'INTEGER';
		case 'DATE':
			return 'TEXT';
		case 'TEXT':
			return 'TEXT';
		case 'FLOAT':
			return 'REAL';
		case 'DOUBLE':
			return 'REAL';
		default:
			return 'TEXT';
	}
};
