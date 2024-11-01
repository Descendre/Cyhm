import {
	Avatar,
	Button,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import { EditHeaderUserPopperInviteListItemProps } from '../../../interfaces';
import { useSession } from 'next-auth/react';
import { usePalette } from '../../../hooks';
import { Send } from '@mui/icons-material';

export const EditHeaderUserPopperInviteListItem = ({
	user,
}: EditHeaderUserPopperInviteListItemProps) => {
	const palette = usePalette();
	const { data: session } = useSession();
	const isSelf: boolean =
		session && session.user && session.user.id === user.id;
	const disabled: boolean = isSelf;

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
			<Button
				disabled={disabled}
				variant="contained"
				size="small"
				disableTouchRipple
				endIcon={<Send sx={{ fontSize: '15px !important' }} />}
				sx={{
					fontSize: '0.8rem',
				}}
			>
				招待
			</Button>
		</ListItem>
	);
};
