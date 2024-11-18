import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddColumnConstraintRequest,
	ColumnConstraintResponse,
	DeleteColumnConstraintRequest,
} from '../../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddColumnConstraintRequest = await req.json();
		const { columnId, type, sqliteClauseType, primaryKeyId } = body;

		let updatedColumnConstraint;
		if (type === 'FOREIGN_KEY') {
			const updatedColumnConstraint: ColumnConstraintResponse =
				await prisma.columnConstraint.upsert({
					where: {
						columnId_type: {
							columnId,
							type,
						},
					},
					update: {
						type: type,
						sqliteClause: sqliteClauseType,
					},
					create: {
						type: type,
						columnId: columnId,
						sqliteClause: sqliteClauseType,
					},
					include: {
						fromReferences: true,
						toReferences: true,
					},
				});

			// 主キー参照情報の追加更新処理
			await prisma.reference.upsert({
				where: {
					foreignKeyId: updatedColumnConstraint.id,
				},
				update: {
					primaryKeyId: primaryKeyId,
					foreignKeyId: updatedColumnConstraint.id,
				},
				create: {
					primaryKeyId: primaryKeyId,
					foreignKeyId: updatedColumnConstraint.id,
				},
			});

			return NextResponse.json(updatedColumnConstraint);
		} else if (type === 'PRIMARY_KEY') {
			updatedColumnConstraint = await prisma.columnConstraint.upsert({
				where: {
					columnId_type: {
						columnId,
						type,
					},
				},
				update: {
					type: type,
					sqliteClause: sqliteClauseType,
				},
				create: {
					type: type,
					columnId: columnId,
					sqliteClause: sqliteClauseType,
				},
			});

			return NextResponse.json(updatedColumnConstraint);
		} else {
			updatedColumnConstraint = await prisma.columnConstraint.upsert({
				where: {
					columnId_type: {
						columnId,
						type,
					},
				},
				update: {
					type: type,
				},
				create: {
					type: type,
					columnId: columnId,
				},
			});

			return NextResponse.json(updatedColumnConstraint);
		}
	} catch (error) {
		console.error('Error creating constraint:', error);
		return NextResponse.json(
			{ error: 'Failed to create constraint' },
			{ status: 500 }
		);
	}
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: DeleteColumnConstraintRequest = await req.json();
		const { id, type } = body;

		if (type === 'PRIMARY_KEY') {
			// 参照元からしないとエラーになるので
			// まず、主キー制約を参照している外部キー制約のIDを全て取得
			const referencedForeignKeyIds = await prisma.reference.findMany({
				where: {
					primaryKeyId: id, // 主キー制約のID
				},
				select: {
					foreignKeyId: true, // 参照している外部キー制約のID
				},
			});

			// 参照している外部キー参照情報を削除
			await prisma.reference.deleteMany({
				where: {
					primaryKeyId: id, // 主キー制約のID
				},
			});

			// 参照している外部キー制約を削除
			await prisma.columnConstraint.deleteMany({
				where: {
					id: {
						in: referencedForeignKeyIds.map((ref) => ref.foreignKeyId), // 参照している外部キー制約IDを使って削除
					},
				},
			});

			// 最後に、主キー制約を削除
			const deletedColumnConstraint = await prisma.columnConstraint.delete({
				where: {
					id: id, // 主キー制約のID
				},
			});
			return NextResponse.json(deletedColumnConstraint);
		} else if (type === 'FOREIGN_KEY') {
			// 外部キー制約を削除する前に、参照されている Reference を削除
			await prisma.reference.deleteMany({
				where: {
					foreignKeyId: id, // 外部キー制約が参照しているID
				},
			});

			// 外部キー制約自体を削除
			const deletedColumnConstraint = await prisma.columnConstraint.delete({
				where: {
					id: id, // 外部キー制約のID
				},
			});
			return NextResponse.json(deletedColumnConstraint);
		} else {
			const deletedColumnConstraint: ColumnConstraintResponse =
				await prisma.columnConstraint.delete({
					where: {
						id: id,
					},
					include: {
						fromReferences: true,
						toReferences: true,
					},
				});

			return NextResponse.json(deletedColumnConstraint);
		}
	} catch (error) {
		console.error('Error deleting constraint:', error);
		return NextResponse.json(
			{ error: 'Failed to delete constraint' },
			{ status: 500 }
		);
	}
};
