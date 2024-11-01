'use client';
import { useContext } from 'react';
import { Context } from '../../provider';
import {
	AddInviteNotifyRequest,
	DeleteInviteNotifyRequest,
	FetchNotifyInvitedUserResponse,
	handleCreateInviteNotifyProps,
	handleDeleteInviteNotifyProps,
	handleFetchInvitedUsersProps,
	NotifyResponse,
	UseNotifyProps,
} from '../../interfaces';
import { axiosFetch } from '../../libs';

export const useNotify = (): UseNotifyProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { invitedUsers, setInvitedUsers } = context;

	const handleCreateInviteNotify = async ({
		fromUserId,
		toUserId,
		projectId,
	}: handleCreateInviteNotifyProps): Promise<void> => {
		try {
			await axiosFetch.post<NotifyResponse>(`/api/supabase/notify/invite`, {
				fromUserId: fromUserId,
				toUserId: toUserId,
				projectId: projectId,
			} as AddInviteNotifyRequest);
			await handleFetchInvitedUsers({ projectId: projectId });
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteInviteNotify = async ({
		fromUserId,
		toUserId,
		projectId,
	}: handleDeleteInviteNotifyProps): Promise<void> => {
		try {
			await axiosFetch.delete(`/api/supabase/notify/invite`, {
				fromUserId: fromUserId,
				toUserId: toUserId,
				projectId: projectId,
			} as DeleteInviteNotifyRequest);
			await handleFetchInvitedUsers({ projectId: projectId });
		} catch (error) {
			console.error(error);
		}
	};

	const handleFetchInvitedUsers = async ({
		projectId,
	}: handleFetchInvitedUsersProps): Promise<void> => {
		try {
			const users = await axiosFetch.get<FetchNotifyInvitedUserResponse[]>(
				`/api/supabase/notify/invitedUser/${projectId}`
			);
			setInvitedUsers(users);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		invitedUsers,
		setInvitedUsers,

		handleCreateInviteNotify,
		handleDeleteInviteNotify,
		handleFetchInvitedUsers,
	};
};
