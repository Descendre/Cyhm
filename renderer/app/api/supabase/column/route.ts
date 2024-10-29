import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import { AddColumnRequest, AddColumnResponse } from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddColumnRequest = await req.json();
		const { name, type, tableId } = body;
		const newColumn = await prisma.column.create({
			data: {
				name: name,
				type: type,
				tableId: tableId,
			},
		});
		const formattedNewColumn: AddColumnResponse = {
			name: newColumn.name,
			type: newColumn.type,
			tableId: newColumn.tableId,
			id: newColumn.id,
			createdAt: newColumn.createdAt,
			updatedAt: newColumn.updatedAt,
			constraints: [],
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
