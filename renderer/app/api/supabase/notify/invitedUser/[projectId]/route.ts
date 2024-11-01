import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import { FetchNotifyInvitedUserResponse } from '../../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { projectId: string } }
): Promise<NextResponse> => {
	try {
		const projectId = params.projectId;
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
		return NextResponse.json(invitedUsers);
	} catch (error) {
		console.error('Error getting notify:', error);
		return NextResponse.json(error);
	}
};
