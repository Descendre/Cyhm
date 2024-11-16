import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import { AddColumnResponse } from '../../../../../interfaces';
import { ColumnConstraintType } from '@prisma/client';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { columnId: string } }
): Promise<NextResponse> => {
	try {
		const columnId = params.columnId;
		const constraintOrder: ColumnConstraintType[] = [
			'PRIMARY_KEY',
			'NOT_NULL',
			'UNIQUE',
			'FOREIGN_KEY',
			'CHECK',
			'DEFAULT',
		];

		const column: AddColumnResponse = await prisma.column.findUnique({
			where: {
				id: columnId,
			},
			include: {
				columnConstraints: {
					include: {
						fromReferences: true,
						toReferences: true,
					},
				},
			},
		});

		if (column) {
			column.columnConstraints.sort(
				(a, b) =>
					constraintOrder.indexOf(a.type) - constraintOrder.indexOf(b.type)
			);
		}

		return NextResponse.json(column);
	} catch (error) {
		console.error('Error fetching columns:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch columns' },
			{ status: 500 }
		);
	}
};
