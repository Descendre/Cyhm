import { Box } from '@mui/material';
import { EditLeftBarAddTableIcon, EditLeftBarTableCollapseIcon } from '../atom';
import { EditLeftBarTableExpandIcon } from '../atom/EditLeftBarExpandIcon';

export const EditLeftBarHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="end"
			alignItems="center"
			gap="5px"
			width="100%"
			height="35px"
			padding="0 10px"
			sx={{
				cursor: 'pointer',
			}}
		>
			<EditLeftBarTableCollapseIcon />
			<EditLeftBarTableExpandIcon />
			<EditLeftBarAddTableIcon />
		</Box>
	);
};
