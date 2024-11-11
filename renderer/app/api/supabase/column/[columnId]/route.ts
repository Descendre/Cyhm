import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import { AddColumnResponse } from '../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { columnId: string } }
): Promise<NextResponse> => {
	try {
		const columnId = params.columnId;
		const columns: AddColumnResponse = await prisma.column.findUnique({
			where: {
				id: columnId,
			},
			include: {
				columnConstraints: true,
			},
		});
		return NextResponse.json(columns);
	} catch (error) {
		console.error('Error fetching columns:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch columns' },
			{ status: 500 }
		);
	}
};
