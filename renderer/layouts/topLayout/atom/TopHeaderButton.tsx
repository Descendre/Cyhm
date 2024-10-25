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
					onClick={onClick}
					disableTouchRipple
					sx={{
						borderRadius: '10px',
						border: `solid 1px ${palette.line.disabled}`,
					}}
				>
					{icon}
				</IconButton>
			</span>
		</Tooltip>
	);
};
