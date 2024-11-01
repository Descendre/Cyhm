import { Box, Button, Typography } from '@mui/material';
import { useNotify } from '../../../hooks';
import { useSession } from 'next-auth/react';
import { TopNotifyModalInvationCommandsProps } from '../../../interfaces';

export const TopNotifyModalInvationCommands = ({
	notify,
}: TopNotifyModalInvationCommandsProps) => {
	const { data: session } = useSession();
	const { handleAcceptInviteNotify, handleRejectInviteNotify } = useNotify();

	const handleAccept = (): void => {
		if (!session || !session.user) return;
		handleAcceptInviteNotify({
			fromUserId: notify.fromUser.id,
			toUserId: session.user.id,
			projectId: notify.project.id,
		});
	};

	const handleReject = (): void => {
		if (!session || !session.user) return;
		handleRejectInviteNotify({
			fromUserId: notify.fromUser.id,
			toUserId: session.user.id,
			projectId: notify.project.id,
		});
	};

	return (
		<Box
			display="flex"
			justifyContent="end"
			alignItems="center"
			gap="15px"
			width="100%"
		>
			{notify.isAccepted ? (
				<Typography variant="body2" fontSize="0.8rem" color="text.disabled">
					リクエストを承認
				</Typography>
			) : notify.isRejected ? (
				<Typography variant="body2" fontSize="0.8rem" color="text.disabled">
					リクエストを拒否
				</Typography>
			) : (
				<>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						disableTouchRipple
						onClick={handleReject}
						sx={{
							fontSize: '0.8rem',
						}}
					>
						参加しない
					</Button>
					<Button
						variant="contained"
						size="small"
						disableTouchRipple
						onClick={handleAccept}
						sx={{
							fontSize: '0.8rem',
						}}
					>
						参加する
					</Button>
				</>
			)}
		</Box>
	);
};
