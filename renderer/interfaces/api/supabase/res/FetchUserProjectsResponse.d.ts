import { DBType, Role } from '@prisma/client';

export interface FetchUserProjectsResponse extends ProjectsResponse {
	members: ProjectMemberProps[];
}

export interface ProjectsResponse {
	id: string;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	dbType: DBType;
}

export interface ProjectMemberProps {
	userId: string;
	userName: string;
	userImage: string;
	joinedAt: Date;
	role: Role;
}
