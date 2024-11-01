import { FetchNotifyInvitedUserResponse, NotifyWithDetail } from '../api';

export interface useNotifyProps {
	invitedUsers: FetchNotifyInvitedUserResponse[];
	setInvitedUsers: React.Dispatch<
		React.SetStateAction<FetchNotifyInvitedUserResponse[]>
	>;
	notifies: NotifyWithDetail[];
	setNotifies: React.Dispatch<React.SetStateAction<NotifyWithDetail[]>>;

	handleFetchUserNotify: ({
		userId,
	}: handleFetchUserNotifyProps) => Promise<void>;
	handleCreateInviteNotify: ({
		fromUserId,
		toUserId,
		projectId,
	}: handleCreateInviteNotifyProps) => Promise<void>;
	handleAcceptInviteNotify: ({
		fromUserId,
		toUserId,
		projectId,
	}: handleAcceptOrRejectInviteNotifyProps) => Promise<void>;
	handleRejectInviteNotify: ({
		fromUserId,
		toUserId,
		projectId,
	}: handleAcceptOrRejectInviteNotifyProps) => Promise<void>;
	handleDeleteInviteNotify: ({
		fromUserId,
		toUserId,
		projectId,
	}: handleDeleteInviteNotifyProps) => Promise<void>;
	handleFetchInvitedUsers: ({
		projectId,
	}: handleFetchInvitedUsersProps) => Promise<void>;
}

export interface handleFetchUserNotifyProps {
	userId: string;
}

export interface handleCreateInviteNotifyProps {
	fromUserId: string;
	toUserId: string;
	projectId: string;
}
export interface handleAcceptOrRejectInviteNotifyProps {
	fromUserId: string;
	toUserId: string;
	projectId: string;
}

export interface handleDeleteInviteNotifyProps {
	fromUserId: string;
	toUserId: string;
	projectId: string;
}

export interface handleFetchInvitedUsersProps {
	projectId: string;
}
