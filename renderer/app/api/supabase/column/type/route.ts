import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddColumnResponse,
	UpdateColumnTypeRequest,
} from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateColumnTypeRequest = await req.json();
		const { columnId, type } = body;
		const updatedColumn: AddColumnResponse = await prisma.column.update({
			where: { id: columnId },
			data: {
				type: type,
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
