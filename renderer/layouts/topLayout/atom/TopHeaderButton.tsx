'use client';
import { IconButton } from '@mui/material';
import { TopHeaderButtonProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';

export const TopHeaderButton = ({
	icon,
	text,
	onClick,
}: TopHeaderButtonProps) => {
	const palette = usePalette();

	return (
		<IconButton
			size="small"
			title={text}
			onClick={onClick}
			disableTouchRipple
			sx={{
				borderRadius: '10px',
				border: `solid 1px ${palette.line.disabled}`,
				'&:hover': {
					border: `solid 1px ${palette.primary.main}`,
					backgroundColor: 'transparent',
				},
			}}
		>
			{icon}
		</IconButton>
	);
};
