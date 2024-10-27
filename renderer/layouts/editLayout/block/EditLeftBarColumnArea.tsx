import { Box, Typography } from '@mui/material';
import { usePalette } from '../../../hooks';
import { ColumnProps } from '../../../interfaces';
import { EditLeftBarTypeTexts } from '../atom';

export const EditLeftBarColumnArea = (props: ColumnProps) => {
	const palette = usePalette();

	return (
		<Box
			width="100%"
			padding="0 10px"
			bgcolor={palette.layout.editLayout.leftBar.column.bg}
			borderBottom={`solid 1px ${palette.layout.editLayout.leftBar.column.line}`}
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="25px"
			>
				<Typography variant="body2" fontSize="0.75rem" color="text.disabled">
					{props.name}
				</Typography>
			</Box>
			<Box
				display="flex"
				justifyContent="end"
				alignItems="center"
				width="100%"
				height="25px"
			>
				<EditLeftBarTypeTexts type={props.type} />
			</Box>
		</Box>
	);
};
