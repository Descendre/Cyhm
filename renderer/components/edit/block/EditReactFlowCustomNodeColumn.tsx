import { Box } from '@mui/material';
import { EditReactFlowCustomNodeColumnProps } from '../../../interfaces';

export const EditReactFlowCustomNodeColumn = ({
	color,
}: EditReactFlowCustomNodeColumnProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="40px"
			padding="0 10px"
			bgcolor={color}
		></Box>
	);
};
