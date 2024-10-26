import { Box } from '@mui/material';
import { EditHeaderSearchBar } from '../atom';

export const EditHeaderCenterCommands = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="30%"
			height="100%"
			padding="0 15px"
		>
			<EditHeaderSearchBar />
		</Box>
	);
};
