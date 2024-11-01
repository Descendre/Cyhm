import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	AddInviteNotifyRequest,
	DeleteInviteNotifyRequest,
	NotifyResponse,
	NotifyWithDetail,
	AcceptOrRejectInviteNotifyRequest,
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

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AcceptOrRejectInviteNotifyRequest = await req.json();
		const { action, fromUserId, toUserId, projectId } = body;

		if (action !== 'accept' && action !== 'reject') {
			return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}

		const updatedNotify: NotifyWithDetail = await prisma.notify.update({
			where: {
				fromUserId_toUserId_projectId: {
					fromUserId,
					toUserId,
					projectId,
				},
				type: 'INVITATION',
			},
			include: {
				fromUser: true,
				project: true,
			},
			data: {
				isRejected: action === 'accept' ? false : true,
				isAccepted: action === 'accept' ? true : false,
			},
		});

		return NextResponse.json(updatedNotify);
	} catch (error) {
		console.error('Error rejecting invitation:', error);
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
