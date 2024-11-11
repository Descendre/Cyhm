import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import { CreateProjectRequest } from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: CreateProjectRequest = await req.json();
		const { name, dbType } = body;
		const project = await prisma.project.create({
			data: {
				name: name,
				dbType: dbType,
			},
		});
		return NextResponse.json(project);
	} catch (error) {
		console.error('Error creating project:', error);
		return NextResponse.json(error);
	}
};
