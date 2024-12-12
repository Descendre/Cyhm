import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddColumnResponse,
	ProjectsResponse,
	UpdateProjectDBTypeRequest,
	UpdateProjectDBTypeResponse,
} from '../../../../../interfaces';
import { SQliteColumnType, SupabaseColumnType } from '@prisma/client';
import { convertDBType } from '../../../../../serverFuctions';

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateProjectDBTypeRequest = await req.json();
		const { id, type } = body;

		// プロジェクトの既存のdbTypeを取得
		const existingProject = await prisma.project.findUnique({
			where: { id },
			include: {
				columns: {
					include: {
						columnConstraints: {
							include: {
								fromReferences: true,
								toReferences: true,
							},
						},
					},
				},
			}, // 関連するカラムも取得
		});

		if (!existingProject) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}

		const { dbType: currentDbType, columns } = existingProject;

		// 各カラムの型を変換
		const updatedColumns: AddColumnResponse[] = await Promise.all(
			columns.map(async (column) => {
				// 現在のdbTypeに対応する型を取得
				const sourceType =
					currentDbType === 'SQLITE' ? column.sqliteType : column.supabaseType;

				if (!sourceType) return column; // 型が設定されていない場合はスキップ

				// 新しいdbTypeに変換
				const targetType = convertDBType(currentDbType, type, sourceType);

				if (!targetType) {
					console.error(
						`Type conversion failed for column ${column.id}: ${sourceType}`
					);
					return column; // 変換できない場合はスキップ
				}

				// カラムを更新
				return prisma.column.update({
					where: { id: column.id },
					data:
						type === 'SQLITE'
							? { sqliteType: targetType as SQliteColumnType } // PrismaのSQLite型にキャスト
							: { supabaseType: targetType as SupabaseColumnType }, // PrismaのSupabase型にキャスト
					include: {
						columnConstraints: {
							include: {
								fromReferences: true,
								toReferences: true,
							},
						},
					},
				});
			})
		);

		// プロジェクトのdbTypeを更新
		const updatedProject: ProjectsResponse = await prisma.project.update({
			where: { id },
			data: { dbType: type },
		});

		return NextResponse.json({
			project: updatedProject,
			columns: updatedColumns,
		} as UpdateProjectDBTypeResponse);
	} catch (error) {
		console.error('Error updating project:', error);
		return NextResponse.json(error);
	}
};
