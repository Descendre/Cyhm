import { Box, Typography } from '@mui/material';
import { EditLeftBarTableHeaderProps } from '../../../interfaces';
import {
	EditLeftBarTableAddColumnIcon,
	EditLeftBarTableExpandIcon,
	EditLeftBarTableMenuIcon,
} from '../atom';

export const EditLeftBarTableHeader = ({
	tableId,
	bg,
	text,
	isExpanded,
}: EditLeftBarTableHeaderProps) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			height="25px"
			padding="0 5px"
			bgcolor={bg}
		>
			<Typography
				variant="body2"
				fontSize="0.75rem"
				noWrap
				sx={{
					flexGrow: 1,
				}}
			>
				{text}
			</Typography>
			<Box display="flex" justifyContent="center" alignItems="center" gap="5px">
				<EditLeftBarTableExpandIcon tableId={tableId} isExpanded={isExpanded} />
				<EditLeftBarTableAddColumnIcon />
				<EditLeftBarTableMenuIcon />
			</Box>
		</Box>
	);
};
