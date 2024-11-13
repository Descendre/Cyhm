import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import {
	AddColumnConstraintRequest,
	ColumnConstraintResponse,
	DeleteColumnConstraintRequest,
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
		console.error('Error creating constraint:', error);
		return NextResponse.json(
			{ error: 'Failed to create constraint' },
			{ status: 500 }
		);
	}
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: DeleteColumnConstraintRequest = await req.json();
		const { id } = body;

		const deletedColumnConstraint: ColumnConstraintResponse =
			await prisma.columnConstraint.delete({
				where: {
					id: id,
				},
			});
		return NextResponse.json(deletedColumnConstraint);
	} catch (error) {
		console.error('Error deleting constraint:', error);
		return NextResponse.json(
			{ error: 'Failed to delete constraint' },
			{ status: 500 }
		);
	}
};
