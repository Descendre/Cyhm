import { Box } from '@mui/material';
import { usePalette } from '../../../hooks';
export const EditLeftBar = () => {
	const palette = usePalette();
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			width="300px"
			height="100%"
			borderRight={`solid 1px ${palette.layout.editLayout.header.line}`}
			bgcolor={palette.layout.editLayout.leftBar.bg}
		></Box>
	);
};
