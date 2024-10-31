import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddTableResponse,
	UpdateTableNameRequest,
} from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateTableNameRequest = await req.json();
		const { tableId, name } = body;
		const updatedTable: AddTableResponse = await prisma.table.update({
			where: { id: tableId },
			data: {
				name: name,
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
