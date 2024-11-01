import { NotifyType } from '@prisma/client';
import { UserResponse } from './UserResponse';
import { CreateProjectResponse } from './CreateProjectResponse';

export interface NotifyResponse {
	projectId: string | null;
	fromUserId: string;
	toUserId: string;
	id: string;
	type: NotifyType;
	message: string | null;
	isRead: boolean;
	isAccepted: boolean;
	isRejected: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface NotifyWithDetail extends NotifyResponse {
	fromUser: UserResponse;
	project: CreateProjectResponse;
}
