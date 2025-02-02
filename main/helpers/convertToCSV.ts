import { ColumnsStateProps, TablesStateProps } from '../../renderer/interfaces';

export const convertToCSV = (
	tablesState: TablesStateProps,
	columnsState: ColumnsStateProps
) => {
	const csvRows: string[][] = [];

	csvRows.push(['Table Name', 'Column Name', 'sqliteType']);

	for (const tableName in tablesState) {
		const table = tablesState[tableName];
		const columns = columnsState[table.id] || [];

		for (const column of columns) {
			csvRows.push([table.name, column.name, column.sqliteType]);
		}
	}

	return csvRows.map((row) => row.join(',')).join('\n');
};
