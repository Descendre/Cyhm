import { Subject } from '@mui/icons-material';
import React from 'react';
import { useLayout, usePalette } from '../../../hooks';
import { Box } from '@mui/material';

export const EditLeftBarReborn = () => {
	const palette = usePalette();
	const { setIsEditLeftBar } = useLayout();

	return (
		<Box
			zIndex={100}
			position="absolute"
			top={0}
			left={0}
			display="flex"
			alignItems="center"
			height="35px"
			padding="0 10px"
		>
			<Subject
				fontSize="small"
				titleAccess="レフトバーを表示"
				onClick={() => setIsEditLeftBar(true)}
				sx={{
					cursor: 'pointer',
					color: palette.text.secondary,
				}}
			/>
		</Box>
	);
};
