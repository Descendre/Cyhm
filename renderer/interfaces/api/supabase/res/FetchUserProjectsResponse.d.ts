import { Role } from '@prisma/client';

export interface FetchUserProjectsResponse {
	id: string;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	members: {
		userId: string;
		userName: string;
		userImage: string;
		joinedAt: Date;
		role: Role;
	}[];
}
