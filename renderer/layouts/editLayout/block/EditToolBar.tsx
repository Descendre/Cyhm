import { Box } from '@mui/material';
import { usePalette } from '../../../hooks';
import { EditFooterMicIcon } from '../atom';

export const EditToolBar = () => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			gap="20px"
			height="40px"
			maxWidth="80%"
			padding="0 20px"
			bgcolor={palette.layout.editLayout.footer.toolBar.bg}
			border={`solid 2px ${palette.layout.editLayout.footer.toolBar.line}`}
			borderRadius="50px"
			sx={{
				pointerEvents: 'auto',
			}}
		>
			<EditFooterMicIcon />
		</Box>
	);
};
