import { Box, Typography } from '@mui/material';
import { EditReactFlowCustomNodeHeaderProps } from '../../../interfaces';

export const EditReactFlowCustomNodeHeader = ({
	title,
	color,
}: EditReactFlowCustomNodeHeaderProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="40px"
			padding="0 10px"
			bgcolor={color}
		>
			<Typography
				variant="body2"
				fontSize="0.8rem"
				width="100%"
				textAlign="center"
				noWrap
			>
				{title}
			</Typography>
		</Box>
	);
};
