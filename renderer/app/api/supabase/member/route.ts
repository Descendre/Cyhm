import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import { AddMemberRequest } from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AddMemberRequest = await req.json();
		const { userId, projectId, role } = body;
		const member = await prisma.member.create({
			data: {
				userId: userId,
				projectId: projectId,
				role: role,
			},
		});
		return NextResponse.json(member);
	} catch (error) {
		console.error('Error adding member:', error);
		return NextResponse.json(error);
	}
};
