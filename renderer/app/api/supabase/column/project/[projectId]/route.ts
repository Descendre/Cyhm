import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import { AddColumnResponse } from '../../../../../../interfaces';
import { ColumnConstraintType } from '@prisma/client';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { tableId: string } }
): Promise<NextResponse> => {
	try {
		const tableId = params.tableId;

		const constraintOrder: ColumnConstraintType[] = [
			'PRIMARY_KEY',
			'NOT_NULL',
			'UNIQUE',
			'FOREIGN_KEY',
			'CHECK',
			'DEFAULT',
		];

		const columns: AddColumnResponse[] = await prisma.column.findMany({
			where: {
				tableId: tableId,
			},
			orderBy: {
				createdAt: 'asc',
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

		const sortedConstraintColumns: AddColumnResponse[] = columns.map(
			(column) => {
				const sortedConstraints = column.columnConstraints.sort((a, b) => {
					const aIndex = constraintOrder.indexOf(a.type);
					const bIndex = constraintOrder.indexOf(b.type);

					return (
						(aIndex === -1 ? constraintOrder.length : aIndex) -
						(bIndex === -1 ? constraintOrder.length : bIndex)
					);
				});

				return {
					...column,
					columnConstraints: sortedConstraints,
				};
			}
		);

		return NextResponse.json(sortedConstraintColumns);
	} catch (error) {
		console.error('Error fetching columns:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch columns' },
			{ status: 500 }
		);
	}
};
