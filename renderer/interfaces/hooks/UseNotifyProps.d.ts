import { FetchNotifyInvitedUserResponse } from '../api';

export interface UseNotifyProps {
	invitedUsers: FetchNotifyInvitedUserResponse[];
	setInvitedUsers: React.Dispatch<
		React.SetStateAction<FetchNotifyInvitedUserResponse[]>
	>;

	handleCreateInviteNotify: ({
		fromUserId,
		toUserId,
		projectId,
	}: handleCreateInviteNotifyProps) => Promise<void>;
	handleDeleteInviteNotify: ({
		fromUserId,
		toUserId,
		projectId,
	}: handleDeleteInviteNotifyProps) => Promise<void>;
	handleFetchInvitedUsers: ({
		projectId,
	}: handleFetchInvitedUsersProps) => Promise<void>;
}

export interface handleCreateInviteNotifyProps {
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
