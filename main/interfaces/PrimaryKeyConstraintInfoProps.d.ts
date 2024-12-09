// 主キー制約のIDをキーにその制約が属するテーブル名とカラム名を保管するオブジェクト型
export interface PrimaryKeyConstraintInfoProps {
	tableName: string;
	columnName: string;
}
