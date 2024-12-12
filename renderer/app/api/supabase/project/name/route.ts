import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	ProjectsResponse,
	UpdateProjectNameRequest,
} from '../../../../../interfaces';

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateProjectNameRequest = await req.json();
		const { id, name } = body;
		const project: ProjectsResponse = await prisma.project.update({
			where: {
				id: id,
			},
			data: {
				name: name,
			},
		});
		return NextResponse.json(project);
	} catch (error) {
		console.error('Error updating project:', error);
		return NextResponse.json(error);
	}
};
