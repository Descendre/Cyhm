import { Box } from '@mui/material';
import { EditToolBar } from '../block';

export const EditFooter = () => {
	return (
		<Box
			position="fixed"
			bottom={0}
			display="flex"
			justifyContent="center"
			alignItems="start"
			width="calc(100% - 300px)"
			height="70px"
			paddingTop="20px"
			sx={{
				pointerEvents: 'none',
			}}
		>
			<EditToolBar />
		</Box>
	);
};
