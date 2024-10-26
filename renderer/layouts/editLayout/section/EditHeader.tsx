import { Box } from '@mui/material';
import { usePalette } from '../../../hooks';
import {
	EditHeaderCenterCommands,
	EditHeaderLeftCommands,
	EditHeaderRightCommands,
} from '../block';

export const EditHeader = () => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="50px"
			borderBottom={`solid 1px ${palette.layout.editLayout.header.line}`}
			bgcolor={palette.layout.editLayout.header.bg}
		>
			<EditHeaderLeftCommands />
			<EditHeaderCenterCommands />
			<EditHeaderRightCommands />
		</Box>
	);
};
