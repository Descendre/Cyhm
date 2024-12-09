import { Badge, Box } from '@mui/material';
import { TopHeaderAvatar } from '../atom';
import {
	Build,
	GitHub,
	Info,
	Notifications,
	Settings,
} from '@mui/icons-material';
import { useLayout, useModal, useNotify, usePalette } from '../../../hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { AppIconButton, AppModal } from '../../../components';
import { TopNotifyModalInner } from './TopNotifyModalInner';

export const TopHeaderButtons = () => {
	const palette = usePalette();
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
				<AppIconButton
					icon={<GitHub />}
					borderColor={palette.line.appIconButton}
					borderHoverColor={palette.primary.main}
					text="github"
					onClick={() => handleGithubExternalShellOpen()}
				/>
				<AppIconButton
					icon={<NotificationsIcon />}
					borderColor={palette.line.appIconButton}
					borderHoverColor={palette.primary.main}
					text="通知"
					onClick={() => openModal('topNotifyModal')}
				/>
				<AppIconButton
					icon={<Settings />}
					borderColor={palette.line.appIconButton}
					borderHoverColor={palette.primary.main}
					text="設定"
					onClick={() => openModal('topSettingModal')}
				/>
				<AppIconButton
					icon={<Info />}
					borderColor={palette.line.appIconButton}
					borderHoverColor={palette.primary.main}
					text="クレジット"
					onClick={() => {}}
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
