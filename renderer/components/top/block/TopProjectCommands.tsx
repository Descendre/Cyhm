import { Box } from '@mui/material';
import {
	TopProjectHeaderNewButton,
	TopProjectHeaderSortIcon,
	TopProjectHeaderViewModeIcon,
} from '../atom';

export const TopProjectCommands = () => {
	return (
		<Box
			display="flex"
			justifyContent="end"
			alignItems="center"
			gap="15px"
			width="50%"
			height="100%"
		>
			<TopProjectHeaderNewButton />
			<TopProjectHeaderViewModeIcon />
			<TopProjectHeaderSortIcon />
		</Box>
	);
};
