import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { tableId: string } }
): Promise<NextResponse> => {
	try {
		const tableId = params.tableId;
		const columns = await prisma.column.findMany({
			where: {
				tableId: tableId,
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
