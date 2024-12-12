/**
 * DB型を別のDB型に変換する関数
 * @param sourceDbType 元のDBタイプ (例: "sqlite")
 * @param targetDbType 変換先のDBタイプ (例: "supabase")
 * @param sourceType 元の型 (例: "INTEGER")
 * @returns 変換後の型 (例: "INT") または null
 */

import { DBType, SQliteColumnType, SupabaseColumnType } from '@prisma/client';
import { dbTypeMap } from './dbTypeMap';
import { UniversalTypeProps } from './UniversalTypeProps';

export const convertDBType = (
	sourceDbType: DBType,
	targetDbType: DBType,
	sourceType: string
): SQliteColumnType | SupabaseColumnType | null => {
	// 1. 元の型から共通型を取得
	const universalType = dbTypeMap[sourceDbType]?.[sourceType];

	if (!universalType) {
		console.error(
			`共通型が見つかりません: ${sourceType} (元DB: ${sourceDbType})`
		);
		return null;
	}

	// 2. universalTypeが配列か単一の型かで分けて処理
	const targetTypes: UniversalTypeProps[] = Array.isArray(universalType)
		? universalType
		: [universalType];

	// 3. 共通型からターゲット型を取得
	for (const targetType of targetTypes) {
		const foundTargetType = Object.entries(dbTypeMap[targetDbType]).find(
			([, universal]) => {
				// 配列の場合、universalが配列の中に存在するかをチェック
				if (Array.isArray(universal)) {
					return universal.includes(targetType);
				} else {
					return universal === targetType;
				}
			}
		)?.[0];

		if (foundTargetType) {
			// 4. 型をPrismaの列挙型に変換
			if (targetDbType === 'SQLITE') {
				return foundTargetType as SQliteColumnType; // PrismaのSQLite型にキャスト
			} else if (targetDbType === 'SUPABASE') {
				return foundTargetType as SupabaseColumnType; // PrismaのSupabase型にキャスト
			}
		}
	}

	console.error(
		`ターゲット型が見つかりません: ${universalType} (ターゲットDB: ${targetDbType})`
	);
	return null;
};
