import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {
	AddColumnResponse,
	AddTableResponse,
	ColumnsStateProps,
	TablesStateProps,
} from '../../renderer/interfaces';
import { PrimaryKeyConstraintInfoProps } from '../interfaces';

export const createDBSchema = async (
	filePath: string,
	tablesState: TablesStateProps,
	columnsState: ColumnsStateProps
): Promise<void> => {
	const db = await open({
		filename: filePath,
		driver: sqlite3.Database,
	});

	// 外部キー設定を有効に
	await db.exec('PRAGMA foreign_keys = ON;');

	// 主キー制約IDに対応するテーブル名とカラム名を保持するマップ
	const primaryKeyMap: Record<string, PrimaryKeyConstraintInfoProps> =
		Object.keys(tablesState).reduce(
			(map, tableId) => {
				const table = tablesState[tableId];
				// 主キー制約を持つカラムを探す
				const primaryKeyColumn = columnsState[tableId]?.find((column) =>
					column.columnConstraints.some(
						(constraint) => constraint.type === 'PRIMARY_KEY'
					)
				);

				if (primaryKeyColumn) {
					// 主キー制約IDを取得（ここでは最初のPRIMARY_KEY制約を仮定）
					const primaryKeyConstraint = primaryKeyColumn.columnConstraints.find(
						(constraint) => constraint.type === 'PRIMARY_KEY'
					);

					if (primaryKeyConstraint) {
						// 主キー制約のIDをキーに使用
						map[primaryKeyConstraint.id] = {
							tableName: table.name,
							columnName: primaryKeyColumn.name,
						};
					}
				} else {
					console.warn(`主キー制約を持つカラムが見つかりません: ${table.name}`);
				}

				return map;
			},
			{} as Record<string, PrimaryKeyConstraintInfoProps>
		);

	for (const tableId in tablesState) {
		const table: AddTableResponse = tablesState[tableId];
		const columns: AddColumnResponse[] = columnsState[tableId] || [];

		const columnDefinitions = columns.map((column) => {
			const constraints = column.columnConstraints.map((constraint) => {
				switch (constraint.type) {
					case 'PRIMARY_KEY':
						// 主キーの場合、INTEGER型かつAUTO_INCREMENTの処理を追加
						if (
							column.sqliteType === 'INTEGER' &&
							constraint.sqliteClause === 'AUTO_INCREMENT'
						) {
							return 'PRIMARY KEY AUTOINCREMENT';
						}
						return 'PRIMARY KEY';
					case 'NOT_NULL':
						return 'NOT NULL';
					case 'UNIQUE':
						return 'UNIQUE';
					case 'DEFAULT':
						return `DEFAULT ${constraint.value}`;
					default:
						return '';
				}
			});

			return `${column.name} ${column.sqliteType} ${constraints.join(' ')}`;
		});

		// 外部キー制約を動的に生成
		const foreignKeys = columns
			.flatMap((column) => {
				return column.columnConstraints
					.filter((constraint) => constraint.type === 'FOREIGN_KEY')
					.map((constraint) => {
						// 外部キー制約の生成
						return constraint.fromReferences
							.map((ref) => {
								// 主キー制約IDに対応するテーブル名とカラム名を取得
								const referencedTable =
									primaryKeyMap[ref.primaryKeyId]?.tableName;
								const referencedColumn =
									primaryKeyMap[ref.primaryKeyId]?.columnName;

								if (!referencedTable || !referencedColumn) {
									throw new Error(
										`参照されるテーブルまたはカラムが見つかりません: ${ref.id}`
									);
								}

								// 外部キー制約のSQL文を生成
								return `FOREIGN KEY(${column.name}) REFERENCES ${referencedTable}(${referencedColumn})`;
							})
							.join(', ');
					});
			})
			.join(', ');

		// CREATE TABLE文の生成
		const createTableQuery = `
		CREATE TABLE IF NOT EXISTS ${table.name} (
			${columnDefinitions.join(', ')}
			${foreignKeys ? `, ${foreignKeys}` : ''}
		)
    `;

		// クエリ実行
		await db.exec(createTableQuery);
	}

	await db.close();
};
