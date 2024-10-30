import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import { AddTableRequest, AddTableResponse } from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddTableRequest = await req.json();
		const { projectId, tableName, color, position } = body;

		const newTable: AddTableResponse = await prisma.table.create({
			data: {
				projectId: projectId,
				name: tableName,
				color: color,
				position: position,
			},
		});

		return NextResponse.json(newTable);
	} catch (error) {
		console.error('Error adding table:', error);
		return NextResponse.json({ error: 'Failed to add table' }, { status: 500 });
	}
};
