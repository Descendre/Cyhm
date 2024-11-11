import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import { FetchProjectResponse } from '../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { projectId: string } }
): Promise<NextResponse> => {
	try {
		const projectId = params.projectId;
		const project = await prisma.project.findUnique({
			where: { id: projectId },
			include: {
				members: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								image: true,
							},
						},
					},
				},
			},
		});

		if (!project) {
			return NextResponse.json(
				{ message: 'Project not found' },
				{ status: 404 }
			);
		}

		const formattedProject: FetchProjectResponse = {
			id: project.id,
			name: project.name,
			isActive: project.isActive,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
			dbType: project.dbType,
			members: project.members.map((member) => ({
				userId: member.userId,
				userName: member.user.name,
				userImage: member.user.image,
				joinedAt: member.createdAt,
				role: member.role,
			})),
		};

		return NextResponse.json(formattedProject);
	} catch (error) {
		console.error('Error fetch project:', error);
		return NextResponse.json(error);
	}
};
