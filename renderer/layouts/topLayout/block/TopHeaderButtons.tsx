import { Badge, Box } from '@mui/material';
import { TopHeaderAvatar, TopHeaderButton } from '../atom';
import {
	Build,
	GitHub,
	Info,
	Notifications,
	Settings,
} from '@mui/icons-material';
import { useLayout, useModal, useNotify } from '../../../hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { AppModal } from '../../../components';
import { TopNotifyModalInner } from './TopNotifyModalInner';

export const TopHeaderButtons = () => {
	const { data: session } = useSession();
	const { handleGithubExternalShellOpen } = useLayout();
	const { isOpen, openModal, closeModal } = useModal();
	const { notifies, handleFetchUserNotify } = useNotify();

	useEffect(() => {
		if (!session || !session.user) return;
		handleFetchUserNotify({ userId: session.user.id });
	}, []); // eslint-disable-line

	const NotificationsIcon = () => (
		<Badge color="primary" max={99} badgeContent={notifies?.length}>
			<Notifications />
		</Badge>
	);

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="10px"
				height="50px"
			>
				<TopHeaderButton
					icon={<GitHub />}
					text="github"
					onClick={() => handleGithubExternalShellOpen()}
				/>
				<TopHeaderButton
					icon={<NotificationsIcon />}
					text="通知"
					onClick={() => openModal('topNotifyModal')}
				/>
				<TopHeaderButton
					icon={<Settings />}
					text="設定"
					onClick={() => openModal('topSettingModal')}
				/>
				<TopHeaderButton
					icon={<Info />}
					text="クレジット"
					onClick={() => console.log()}
				/>
				<TopHeaderAvatar />
			</Box>

			<AppModal
				isOpen={isOpen('topNotifyModal')}
				closeModal={() => closeModal('topNotifyModal')}
				outerClose
				width="400px"
				height="80vh"
				maxHeight="520px"
				icon={<Notifications fontSize="small" />}
				title="通知一覧"
			>
				<TopNotifyModalInner />
			</AppModal>

			<AppModal
				isOpen={isOpen('topSettingModal')}
				closeModal={() => closeModal('topSettingModal')}
				outerClose
				width="60vw"
				height="80vh"
				maxWidth="650px"
				maxHeight="520px"
				icon={<Build fontSize="small" />}
				title="アプリの設定"
			>
				<></>
			</AppModal>
		</>
	);
};
