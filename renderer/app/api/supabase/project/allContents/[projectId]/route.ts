import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import {
	FetchAllContentsResponse,
	FetchNotifyInvitedUserResponse,
} from '../../../../../../interfaces';
import { ColumnConstraintType } from '@prisma/client';

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
			orderBy: {
				createdAt: 'asc',
			},
			include: {
				columns: {
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
				},
			},
		});

		const invitedUsers: FetchNotifyInvitedUserResponse[] =
			await prisma.notify.findMany({
				where: {
					projectId: projectId,
					isAccepted: false,
					isRejected: false,
					type: 'INVITATION',
				},
				distinct: ['toUserId'],
				select: {
					createdAt: true,
					toUser: {
						select: {
							id: true,
							createdAt: true,
							updatedAt: true,
							image: true,
							name: true,
							email: true,
							provider: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

		const response: FetchAllContentsResponse = {
			tables: {},
			columns: {},
			invitedUsers: invitedUsers,
		};

		const constraintOrder: ColumnConstraintType[] = [
			'PRIMARY_KEY',
			'NOT_NULL',
			'UNIQUE',
			'FOREIGN_KEY',
			'CHECK',
			'DEFAULT',
		];

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
			response.columns[table.id] = table.columns.map((column) => {
				const sortedConstraints = column.columnConstraints.sort(
					(a, b) =>
						constraintOrder.indexOf(a.type) - constraintOrder.indexOf(b.type)
				);
				return {
					id: column.id,
					name: column.name,
					sqliteType: column.sqliteType,
					supabaseType: column.supabaseType,
					tableId: column.tableId,
					projectId: column.projectId,
					createdAt: column.createdAt,
					updatedAt: column.updatedAt,
					columnConstraints: sortedConstraints,
				};
			});
		});
		return NextResponse.json(response as FetchAllContentsResponse);
	} catch (error) {
		console.error('Error fetching tables and columns:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch tables and columns' },
			{ status: 500 }
		);
	}
};
