import {
	Avatar,
	Button,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { EditHeaderUserPopperInviteListItemProps } from '../../../interfaces';
import { useSession } from 'next-auth/react';
import { useNotify, usePalette, useProject } from '../../../hooks';
import { AccessTime, Send } from '@mui/icons-material';

export const EditHeaderUserPopperInviteListItem = ({
	user,
}: EditHeaderUserPopperInviteListItemProps) => {
	const palette = usePalette();
	const { currentProject } = useProject();
	const { invitedUsers, handleCreateInviteNotify } = useNotify();
	const { data: session } = useSession();
	const isSelf: boolean =
		session && session.user && session.user.id === user.id;
	const isMember: boolean = !!currentProject.members.find(
		(member) => member.userId === user.id
	);

	const invitedUserInfo = invitedUsers.find(
		(invitedUser) => invitedUser.toUser.id === user.id
	);
	const isInvited: boolean = !!invitedUserInfo;

	const handleInvite = async (): Promise<void> => {
		if (!session || !session.user) return;
		await handleCreateInviteNotify({
			fromUserId: session.user.id,
			toUserId: user.id,
			projectId: currentProject.id,
		});
	};

	return (
		<ListItem
			sx={{
				height: '60px',
			}}
		>
			<ListItemAvatar>
				<Avatar
					src={user.image}
					sx={{
						width: '35px',
						height: '35px',
					}}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<>
						{user.name}
						{isSelf && (
							<span
								style={{
									color: palette.primary.main,
									marginLeft: '5px',
									fontSize: '0.8rem',
								}}
							>
								(You)
							</span>
						)}
					</>
				}
				secondary={`(${user.provider})`}
				primaryTypographyProps={{
					fontSize: '0.9rem',
					sx: {
						wordBreak: 'break-all',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						userSelect: 'none',
					},
				}}
				secondaryTypographyProps={{
					fontSize: '0.8rem',
					color: palette.text.disabled,
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					sx: {
						userSelect: 'none',
					},
				}}
			/>
			{isMember ? (
				<Typography
					variant="body2"
					color="text.disabled"
					sx={{
						userSelect: 'none',
						fontSize: '0.8rem',
					}}
				>
					あなたです
				</Typography>
			) : isMember ? (
				<Typography
					variant="body2"
					color="text.disabled"
					sx={{
						fontSize: '0.8rem',
						userSelect: 'none',
					}}
				>
					メンバー
				</Typography>
			) : isInvited ? (
				<Button
					disabled
					variant="contained"
					size="small"
					disableTouchRipple
					endIcon={<AccessTime sx={{ fontSize: '0.9rem !important' }} />}
					sx={{
						fontSize: '0.8rem',
					}}
				>
					招待中
				</Button>
			) : (
				<Button
					variant="contained"
					size="small"
					disableTouchRipple
					endIcon={<Send sx={{ fontSize: '0.9rem !important' }} />}
					onClick={handleInvite}
					sx={{
						fontSize: '0.8rem',
					}}
				>
					招待
				</Button>
			)}
		</ListItem>
	);
};
