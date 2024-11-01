export interface AcceptOrRejectInviteNotifyRequest {
	action: 'accept' | 'reject';
	fromUserId: string;
	toUserId: string;
	projectId: string;
}
