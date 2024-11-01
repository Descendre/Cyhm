import {
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import { EditHeaderUserPopperMemberListItemProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';
import { useSession } from 'next-auth/react';
import { EditFooterMicIcon } from './EditFooterMicIcon';
import { EditFooterAudioIcon } from './EditFooterAudioIcon';

export const EditHeaderUserPopperMemberListItem = ({
	member,
}: EditHeaderUserPopperMemberListItemProps) => {
	const palette = usePalette();
	const { data: session } = useSession();
	const isSelf: boolean =
		session && session.user && session.user.id === member.userId;

	return (
		<ListItem
			sx={{
				height: '60px',
				cursor: 'pointer',
			}}
		>
			<ListItemAvatar>
				<Avatar
					src={member.userImage}
					sx={{
						width: '35px',
						height: '35px',
					}}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<>
						{member.userName}
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
				secondary={member.role}
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
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="10px"
			>
				<EditFooterMicIcon />
				<EditFooterAudioIcon />
			</Box>
		</ListItem>
	);
};
