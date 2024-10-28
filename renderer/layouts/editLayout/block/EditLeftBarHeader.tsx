import { Box } from '@mui/material';
import {
	EditLeftBarAddTableIcon,
	EditLeftBarTableCollapseIcon,
	EditLeftBarToggleIcon,
} from '../atom';
import { EditLeftBarTableExpandIcon } from '../atom/EditLeftBarExpandIcon';

export const EditLeftBarHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			height="35px"
			padding="0 10px"
		>
			<EditLeftBarToggleIcon />
			<Box display="flex" justifyContent="center" alignItems="center" gap="5px">
				<EditLeftBarTableCollapseIcon />
				<EditLeftBarTableExpandIcon />
				<EditLeftBarAddTableIcon />
			</Box>
		</Box>
	);
};
