import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import {
	AddColumnConstraintRequest,
	ColumnConstraintResponse,
} from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddColumnConstraintRequest = await req.json();
		const { columnId, dbType, type, sqliteClauseType } = body;

		const createData =
			dbType === 'SQLITE' ? { sqliteClause: sqliteClauseType } : {};

		const updatedColumnConstraint: ColumnConstraintResponse =
			await prisma.columnConstraint.upsert({
				where: {
					columnId_type: {
						columnId,
						type,
					},
				},
				update: {
					type: type,
					...createData,
				},
				create: {
					type: type,
					columnId: columnId,
					...createData,
				},
			});
		return NextResponse.json(updatedColumnConstraint);
	} catch (error) {
		console.error('Error creating clause:', error);
		return NextResponse.json(
			{ error: 'Failed to create clause' },
			{ status: 500 }
		);
	}
};
