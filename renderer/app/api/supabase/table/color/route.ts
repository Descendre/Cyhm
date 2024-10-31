import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddTableResponse,
	UpdateTableColorRequest,
} from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateTableColorRequest = await req.json();
		const { tableId, color } = body;
		const updatedTable: AddTableResponse = await prisma.table.update({
			where: { id: tableId },
			data: {
				color: color,
			},
		});
		return NextResponse.json(updatedTable);
	} catch (error) {
		console.error('Error updating table:', error);
		return NextResponse.json(
			{ error: 'Failed to update table' },
			{ status: 500 }
		);
	}
};
