import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import { AddColumnRequest, AddColumnResponse } from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddColumnRequest = await req.json();
		const { name, dbType, tableId, projectId } = body;

		const updateData: {} =
			dbType === 'SQLITE'
				? { sqliteType: 'INTEGER' }
				: dbType === 'SUPABASE'
					? { supabaseType: 'INT' }
					: {};

		const newColumn = await prisma.column.create({
			data: {
				name: name,
				...updateData,
				tableId: tableId,
				projectId: projectId,
			},
		});
		const formattedNewColumn: AddColumnResponse = {
			name: newColumn.name,
			sqliteType: newColumn.sqliteType,
			supabaseType: newColumn.supabaseType,
			tableId: newColumn.tableId,
			projectId: newColumn.projectId,
			id: newColumn.id,
			createdAt: newColumn.createdAt,
			updatedAt: newColumn.updatedAt,
			columnConstraints: [],
		};
		return NextResponse.json(formattedNewColumn);
	} catch (error) {
		console.error('Error adding column:', error);
		return NextResponse.json(
			{ error: 'Failed to add column' },
			{ status: 500 }
		);
	}
};
