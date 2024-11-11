import { ListItemButton, ListItemText } from '@mui/material';
import { TopProjectStartPopperListItemProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';
import { KeyboardArrowRight } from '@mui/icons-material';

export const TopProjectStartPopperListItem = ({
	primary,
	secondary,
	onClick,
}: TopProjectStartPopperListItemProps) => {
	const palette = usePalette();

	return (
		<ListItemButton
			disableTouchRipple
			onClick={() => onClick()}
			sx={{
				cursor: 'pointer',
				height: '60px',
			}}
		>
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
					fontSize: '0.7rem',
					color: palette.text.disabled,
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					sx: {
						userSelect: 'none',
					},
				}}
			></ListItemText>
			<KeyboardArrowRight fontSize="small" />
		</ListItemButton>
	);
};
