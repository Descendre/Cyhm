import { Box } from '@mui/material';
import { TopProjectHeaderSearchBar } from '../atom';

export const TopProjectSearchArea = () => {
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			width="50%"
			height="100%"
		>
			<TopProjectHeaderSearchBar />
		</Box>
	);
};
