import { Box } from '@mui/material';
import { EditHeaderAvatars } from './EditHeaderAvatars';
import { EditHeaderDownloadButton } from '../atom';
export const EditHeaderRightCommands = () => {
	return (
		<Box
			display="flex"
			justifyContent="end"
			alignItems="center"
			gap="15px"
			width="35%"
			height="100%"
			padding="0 15px"
		>
			<EditHeaderDownloadButton />
			<EditHeaderAvatars />
		</Box>
	);
};
