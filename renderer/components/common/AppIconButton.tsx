'use client';
import { IconButton } from '@mui/material';
import { AppIconButtonProps } from '../../interfaces';

export const AppIconButton = ({
	icon,
	borderColor,
	borderHoverColor,
	text,
	onClick,
}: AppIconButtonProps) => {
	return (
		<IconButton
			size="small"
			title={text}
			onClick={onClick}
			disableTouchRipple
			sx={{
				borderRadius: '10px',
				border: `solid 1px ${borderColor}`,
				'&:hover': {
					border: `solid 1px ${borderHoverColor}`,
					backgroundColor: 'transparent',
				},
			}}
		>
			{icon}
		</IconButton>
	);
};
