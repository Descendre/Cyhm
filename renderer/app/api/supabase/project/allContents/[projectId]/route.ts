import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import {
	CheckConstraintProps,
	ColumnConstraintProps,
	DefaultConstraintProps,
	FetchAllContentsResponse,
} from '../../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { projectId: string } }
): Promise<NextResponse> => {
	try {
		const projectId = params.projectId;
		const allContents = await prisma.table.findMany({
			where: {
				projectId: projectId,
			},
			include: {
				columns: {
					include: {
						columnConstraints: true,
					},
				},
			},
		});

		const response: FetchAllContentsResponse = {
			tables: {},
			columns: {},
		};

		allContents.forEach((table) => {
			response.tables[table.id] = {
				projectId: table.projectId,
				color: table.color,
				position: table.position as { x: number; y: number },
				name: table.name,
				id: table.id,
				isExpanded: table.isExpanded,
				isEditing: table.isEditing,
				createdAt: table.createdAt,
				updatedAt: table.updatedAt,
			};
			response.columns[table.id] = table.columns.map((column) => ({
				id: column.id,
				name: column.name,
				type: column.type,
				tableId: column.tableId,
				createdAt: column.createdAt,
				updatedAt: column.updatedAt,
				constraints: column.columnConstraints.map((constraint) => ({
					type: constraint.type,
					value: constraint.constraintValue || null,
				})),
			}));
		});
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching tables and columns:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch tables and columns' },
			{ status: 500 }
		);
	}
};