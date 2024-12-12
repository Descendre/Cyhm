import { DBType } from '@prisma/client';
import { UniversalTypeProps } from './UniversalTypeProps';

// プロジェクトのDBタイプを変更した際にカラムの型をDB間でより近いものにより合わせるためのマッピングオブジェクト
// 共通中間型(抽象型)を経由して変換を行うことで迅速な組み合わせの構築を可能に。
export const dbTypeMap: Record<
	DBType,
	Record<string, UniversalTypeProps | UniversalTypeProps[]>
> = {
	SQLITE: {
		INTEGER: [UniversalTypeProps.INTEGER, UniversalTypeProps.BOOLEAN],
		TEXT: [UniversalTypeProps.STRING, UniversalTypeProps.DATE],
		REAL: UniversalTypeProps.FLOAT,
		BLOB: [UniversalTypeProps.BLOB, UniversalTypeProps.JSON],
	},
	SUPABASE: {
		STRING: UniversalTypeProps.STRING,
		INT: UniversalTypeProps.INTEGER,
		BIGINT: UniversalTypeProps.INTEGER,
		FLOAT: UniversalTypeProps.FLOAT,
		DECIMAL: UniversalTypeProps.FLOAT,
		BOOLEAN: UniversalTypeProps.BOOLEAN,
		JSON: UniversalTypeProps.JSON,
		DATETIME: UniversalTypeProps.DATE,
		BYTES: UniversalTypeProps.BLOB,
	},
};
