'use client';
import { IconButton, Tooltip } from '@mui/material';
import { TopHeaderButtonProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';

export const TopHeaderButton = ({
	icon,
	text,
	onClick,
}: TopHeaderButtonProps) => {
	const palette = usePalette();

	return (
		<Tooltip title={text} placement="bottom">
			<span>
				<IconButton
					size="small"
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
			</span>
		</Tooltip>
	);
};
