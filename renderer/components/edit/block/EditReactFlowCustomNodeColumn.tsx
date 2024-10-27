'use client';
import { Box, Typography } from '@mui/material';
import { EditReactFlowCustomNodeColumnProps } from '../../../interfaces';
import { EditLeftBarTypeTexts } from '../../../layouts/editLayout/atom';

export const EditReactFlowCustomNodeColumn = ({
	color,
	name,
	type,
}: EditReactFlowCustomNodeColumnProps) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			gap="5px"
			width="100%"
			height="40px"
			padding="0 10px"
			bgcolor={color}
		>
			<Typography
				variant="body2"
				fontSize="0.8rem"
				color="text.secondary"
				noWrap
			>
				{name}
			</Typography>
			<EditLeftBarTypeTexts type={type} />
		</Box>
	);
};
