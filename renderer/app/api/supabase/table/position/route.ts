import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import { UpdateTablePositionRequest } from '../../../../../interfaces';
import { UpdateTablePositionResponse } from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateTablePositionRequest = await req.json();
		const { tableId, position } = body;

		const updatedTable: UpdateTablePositionResponse = await prisma.table.update(
			{
				where: { id: tableId },
				data: {
					position: position,
				},
			}
		);

		return NextResponse.json(updatedTable);
	} catch (error) {
		console.error('Error adding table:', error);
		return NextResponse.json({ error: 'Failed to add table' }, { status: 500 });
	}
};
