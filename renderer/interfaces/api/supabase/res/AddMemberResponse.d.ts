import { Role } from '@prisma/client';

export interface AddMemberResponse {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	projectId: string;
	role: Role;
}
