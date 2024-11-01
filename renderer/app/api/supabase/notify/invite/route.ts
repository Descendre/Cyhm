import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddInviteNotifyRequest,
	DeleteInviteNotifyRequest,
	NotifyResponse,
} from '../../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddInviteNotifyRequest = await req.json();
		const { fromUserId, toUserId, projectId } = body;
		const notify: NotifyResponse = await prisma.notify.upsert({
			where: {
				// ユニーク制約を基にした条件を設定
				fromUserId_toUserId_projectId: {
					fromUserId,
					toUserId,
					projectId,
				},
			},
			update: {
				isRejected: false,
				updatedAt: new Date(),
			},
			create: {
				fromUser: { connect: { id: fromUserId } },
				toUser: { connect: { id: toUserId } },
				project: { connect: { id: projectId } },
				type: 'INVITATION',
				isRejected: false,
			},
		});
		return NextResponse.json(notify);
	} catch (error) {
		console.error('Error creating invite:', error);
		return NextResponse.json(error);
	}
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: DeleteInviteNotifyRequest = await req.json();
		const { fromUserId, toUserId, projectId } = body;

		await prisma.notify.deleteMany({
			where: {
				fromUserId,
				toUserId,
				projectId,
				type: 'INVITATION',
			},
		});

		return NextResponse.json({ message: 'Invitation successfully deleted' });
	} catch (error) {
		console.error('Error deleting invitation:', error);
		return NextResponse.json(error);
	}
};
