import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../libs';
import {
	CreateProjectRequest,
	CreateProjectResponse,
} from '../../../../interfaces';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: CreateProjectRequest = await req.json();
		const { name } = body;
		const project: CreateProjectResponse = await prisma.project.create({
			data: {
				name: name,
			},
		});
		return NextResponse.json(project);
	} catch (error) {
		console.error('Error creating project:', error);
		return NextResponse.json(error);
	}
};
