import { Box } from '@mui/material';
import { EditToolBar } from '../block';
import { useState } from 'react';
import { useLayout } from '../../../hooks';

export const EditFooter = () => {
	const { isPinned } = useLayout();
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<Box
			position="fixed"
			bottom={0}
			display="flex"
			justifyContent="center"
			alignItems="start"
			width="calc(100% - 300px)"
			height="100px"
			paddingTop="20px"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<EditToolBar isHovered={isHovered || isPinned} />
		</Box>
	);
};
