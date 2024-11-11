import { DBType, Role } from '@prisma/client';

export interface FetchUserProjectsResponse {
	id: string;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	dbType: DBType;
	members: ProjectMemberProps[];
}

export interface ProjectMemberProps {
	userId: string;
	userName: string;
	userImage: string;
	joinedAt: Date;
	role: Role;
}
