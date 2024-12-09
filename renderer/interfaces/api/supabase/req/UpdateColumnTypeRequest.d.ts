import { DBType, SQliteColumnType, SupabaseColumnType } from '@prisma/client';

export interface UpdateColumnTypeRequest {
	columnId: string;
	dbType: DBType;
	sqliteType?: SQliteColumnType;
	supabaseType?: SupabaseColumnType;
}
