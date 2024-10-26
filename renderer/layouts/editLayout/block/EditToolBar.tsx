import { Box } from '@mui/material';
import { EditToolBarProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';
import { EditFooterMicIcon, EditFooterPinIcon } from '../atom';

export const EditToolBar = ({ isHovered }: EditToolBarProps) => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			gap="20px"
			height="50px"
			maxWidth="80%"
			padding="0 20px"
			bgcolor={palette.layout.editLayout.footer.toolBar.bg}
			border={`solid 2px ${palette.layout.editLayout.footer.toolBar.line}`}
			borderRadius="50px"
			sx={{
				opacity: isHovered ? 1 : 0,
				transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
				transition: 'opacity 0.3s ease, transform 0.3s ease',
			}}
		>
			<EditFooterMicIcon />
			<EditFooterPinIcon />
		</Box>
	);
};
