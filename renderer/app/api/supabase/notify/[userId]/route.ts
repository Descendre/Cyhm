import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import { NotifyWithDetail } from '../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { userId: string } }
): Promise<NextResponse> => {
	try {
		const userId = params.userId;
		const notifications: NotifyWithDetail[] = await prisma.notify.findMany({
			where: {
				toUserId: userId,
			},
			include: {
				fromUser: true,
				project: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
		return NextResponse.json(notifications);
	} catch (error) {
		console.error('Error fetching notifications:', error);
		return NextResponse.json(error);
	}
};
