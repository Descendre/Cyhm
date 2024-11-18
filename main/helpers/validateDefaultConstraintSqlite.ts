import sqlite3 from 'sqlite3';
import {
	validateDefaultConstraintSqliteProps,
	validateDefaultConstraintSqliteReturn,
} from '../interfaces';

export const validateDefaultConstraintSqlite = async ({
	column,
	value,
}: validateDefaultConstraintSqliteProps): Promise<validateDefaultConstraintSqliteReturn> => {
	// メモリ上のSQLiteデータベースを作成
	const db = new sqlite3.Database(':memory:');

	try {
		// 仮のテーブルを作成
		const tableName = 'temp_table';
		const columnName = 'temp_column';

		await new Promise<void>((resolve, reject) => {
			db.run(
				`CREATE TABLE ${tableName} (${columnName} ${column.sqliteType} DEFAULT ${value});`,
				(err) => {
					if (err) {
						reject(new Error(err.message));
					} else {
						resolve();
					}
				}
			);
		});

		// 成功した場合
		return { message: '' };
	} catch (err: any) {
		// エラー時の処理
		console.error(err.message);
		return { message: err.message };
	} finally {
		db.close();
	}
};
