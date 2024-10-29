import { Role } from '@prisma/client';

export interface AddMemberRequest {
	userId: string;
	projectId: string;
	role: Role;
}
