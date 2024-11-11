import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddColumnResponse,
	UpdateColumnTypeRequest,
} from '../../../../../interfaces';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateColumnTypeRequest = await req.json();
		const { columnId, dbType, type } = body;

		const updateData = dbType === 'SQLITE' ? { sqliteType: type } : {};

		const updatedColumn: AddColumnResponse = await prisma.column.update({
			where: { id: columnId },
			data: updateData,
			include: {
				columnConstraints: true,
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
