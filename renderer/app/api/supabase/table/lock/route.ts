import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	UpdateTableLockRequest,
	UpdateTableLockResponse,
} from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateTableLockRequest = await req.json();
		const { tableId, isEdit } = body;
		const updatedTable: UpdateTableLockResponse = await prisma.table.update({
			where: { id: tableId },
			data: {
				isEditing: isEdit,
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
