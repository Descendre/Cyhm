import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {
	AddColumnResponse,
	AddTableResponse,
	ColumnsStateProps,
	TablesStateProps,
} from '../../renderer/interfaces';
import { getSQLiteType } from './getSQLiteType';

export const createDBSchema = async (
	filePath: string,
	tablesState: TablesStateProps,
	columnsState: ColumnsStateProps
): Promise<void> => {
	const db = await open({
		filename: filePath,
		driver: sqlite3.Database,
	});

	for (const tableId in tablesState) {
		const table: AddTableResponse = tablesState[tableId];
		const columns: AddColumnResponse[] = columnsState[tableId] || [];

		const columnDefinitions = columns
			.map((column) => {
				return `${column.name} ${getSQLiteType(column.type)}`;
			})
			.join(', ');

		const createTableQuery = `CREATE TABLE IF NOT EXISTS ${table.name} (id TEXT PRIMARY KEY, ${columnDefinitions})`;
		await db.exec(createTableQuery);
	}

	await db.close();
};
