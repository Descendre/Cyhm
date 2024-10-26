import { Box } from '@mui/material';
import { TopProjectCommands, TopProjectSearchArea } from '../block';

export const TopProjectHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="50px"
		>
			<TopProjectSearchArea />
			<TopProjectCommands />
		</Box>
	);
};
