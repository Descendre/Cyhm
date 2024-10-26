import { Menu } from '@mui/icons-material';
import React from 'react';
import { usePalette } from '../../../hooks';

export const EditLeftBarTableMenuIcon = () => {
	const palette = usePalette();
	return (
		<Menu
			fontSize="small"
			titleAccess="メニューを表示"
			sx={{
				cursor: 'pointer',
				color: palette.text.secondary,
			}}
		/>
	);
};
