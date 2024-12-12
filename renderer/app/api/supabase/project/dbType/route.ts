import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../libs';
import {
	ProjectsResponse,
	UpdateProjectDBTypeRequest,
} from '../../../../../interfaces';

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: UpdateProjectDBTypeRequest = await req.json();
		const { id, type } = body;
		const project: ProjectsResponse = await prisma.project.update({
			where: {
				id: id,
			},
			data: {
				dbType: type,
			},
		});
		return NextResponse.json(project);
	} catch (error) {
		console.error('Error updating project:', error);
		return NextResponse.json(error);
	}
};
