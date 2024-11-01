import { NotifyType } from '@prisma/client';

export interface NotifyResponse {
	projectId: string | null;
	fromUserId: string;
	toUserId: string;
	id: string;
	type: NotifyType;
	message: string | null;
	isRead: boolean;
	createdAt: Date;
	updatedAt: Date;
}
