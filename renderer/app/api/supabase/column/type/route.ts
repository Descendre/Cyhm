import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddColumnResponse,
	UpdateColumnTypeRequest,
} from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateColumnTypeRequest = await req.json();
		const { columnId, dbType, sqliteType, supabaseType } = body;

		if (
			(dbType === 'SQLITE' && !sqliteType) ||
			(dbType === 'SUPABASE' && !supabaseType)
		) {
			return NextResponse.json(
				{
					error:
						dbType === 'SQLITE'
							? 'SQLiteのカラムタイプが指定されていません。'
							: 'Supabaseのカラムタイプが指定されていません。',
				},
				{ status: 400 }
			);
		}

		const updateData =
			dbType === 'SQLITE'
				? { sqliteType: sqliteType }
				: { supabaseType: supabaseType };

		const updatedColumn: AddColumnResponse = await prisma.column.update({
			where: { id: columnId },
			data: updateData,
			include: {
				columnConstraints: {
					include: {
						fromReferences: true,
						toReferences: true,
					},
				},
			},
		});
		return NextResponse.json(updatedColumn);
	} catch (error) {
		console.error('Error updating column:', error);
		return NextResponse.json(
			{ error: 'Failed to update column' },
			{ status: 500 }
		);
	}
};
