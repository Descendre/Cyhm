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
	handleFetchUserNotifyProps,
	handleAcceptOrRejectInviteNotifyProps,
	NotifyResponse,
	NotifyWithDetail,
	AcceptOrRejectInviteNotifyRequest,
	useNotifyProps,
} from '../../interfaces';
import { axiosFetch } from '../../libs';
import { useProject } from './useProject';

export const useNotify = (): useNotifyProps => {
	const { handleFetchUserProjects } = useProject();
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const { invitedUsers, setInvitedUsers, notifies, setNotifies } = context;

	const handleFetchUserNotify = async ({
		userId,
	}: handleFetchUserNotifyProps): Promise<void> => {
		try {
			const userNotifies = await axiosFetch.get<NotifyWithDetail[]>(
				`/api/supabase/notify/${userId}`
			);
			setNotifies(userNotifies);
		} catch (error) {
			console.error(error);
		}
	};

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

	const handleAcceptInviteNotify = async ({
		fromUserId,
		toUserId,
		projectId,
	}: handleAcceptOrRejectInviteNotifyProps): Promise<void> => {
		try {
			await axiosFetch.patch<NotifyResponse>(`/api/supabase/notify/invite`, {
				action: 'accept',
				fromUserId: fromUserId,
				toUserId: toUserId,
				projectId: projectId,
			} as AcceptOrRejectInviteNotifyRequest);
			await axiosFetch.post(`/api/supabase/member`, {
				userId: toUserId,
				projectId: projectId,
				role: 'member',
			});
			await handleFetchUserProjects({ userId: toUserId });
			await handleFetchUserNotify({ userId: toUserId });
		} catch (error) {
			console.error(error);
		}
	};

	const handleRejectInviteNotify = async ({
		fromUserId,
		toUserId,
		projectId,
	}: handleAcceptOrRejectInviteNotifyProps): Promise<void> => {
		try {
			await axiosFetch.patch<NotifyResponse>(`/api/supabase/notify/invite`, {
				action: 'reject',
				fromUserId: fromUserId,
				toUserId: toUserId,
				projectId: projectId,
			} as AcceptOrRejectInviteNotifyRequest);
			await handleFetchUserNotify({ userId: toUserId });
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
		notifies,
		setNotifies,

		handleFetchUserNotify,
		handleCreateInviteNotify,
		handleAcceptInviteNotify,
		handleRejectInviteNotify,
		handleDeleteInviteNotify,
		handleFetchInvitedUsers,
	};
};
