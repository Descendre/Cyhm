import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import { FetchUserProjectsResponse } from '../../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { userId: string } }
): Promise<NextResponse> => {
	try {
		const userId = params.userId;

		const projectIdObject = await prisma.member.findMany({
			where: {
				userId: userId,
			},
			select: {
				projectId: true,
			},
		});

		const projectIds = projectIdObject.map((project) => project.projectId);

		const projects = await prisma.project.findMany({
			where: {
				id: { in: projectIds },
			},
			orderBy: {
				updatedAt: 'desc',
			},
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

		const formattedProjects: FetchUserProjectsResponse[] = projects.map(
			(project) => ({
				id: project.id,
				name: project.name,
				isActive: project.isActive,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
				dbType: project.dbType,
				members: project.members.map((member) => ({
					userId: member.user.id,
					userName: member.user.name,
					userImage: member.user.image,
					joinedAt: member.createdAt,
					role: member.role,
				})),
			})
		);

		return NextResponse.json(formattedProjects);
	} catch (error) {
		console.error('Error fetch user projects:', error);
		return NextResponse.json(error);
	}
};
