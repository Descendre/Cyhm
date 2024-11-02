import {
	Avatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { EditHeaderDownloadPopperListItemProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';
import { Download } from '@mui/icons-material';

export const EditHeaderDownloadPopperListItem = ({
	primary,
	secondary,
	icon,
	onClick,
}: EditHeaderDownloadPopperListItemProps) => {
	const palette = usePalette();

	return (
		<>
			<ListItemButton
				disableTouchRipple
				onClick={() => onClick()}
				sx={{
					cursor: 'pointer',
					height: '70px',
				}}
			>
				<ListItemIcon
					sx={{
						color: palette.primary.main,
					}}
				>
					<Avatar
						sx={{
							width: '30px',
							height: '30px',
							color: palette.primary.main,
							border: `solid 1px ${palette.primary.main}`,
							borderRadius: '50%',
							bgcolor: 'transparent',
						}}
					>
						{icon}
					</Avatar>
				</ListItemIcon>
				<ListItemText
					primary={primary}
					secondary={secondary}
					primaryTypographyProps={{
						fontSize: '0.9rem',
						color: palette.text.primary,
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						sx: {
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
				></ListItemText>
				<Download fontSize="small" />
			</ListItemButton>
		</>
	);
};
