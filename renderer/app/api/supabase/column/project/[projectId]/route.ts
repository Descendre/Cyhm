import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import { AddColumnResponse } from '../../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { tableId: string } }
): Promise<NextResponse> => {
	try {
		const tableId = params.tableId;
		const columns: AddColumnResponse[] = await prisma.column.findMany({
			where: {
				tableId: tableId,
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
