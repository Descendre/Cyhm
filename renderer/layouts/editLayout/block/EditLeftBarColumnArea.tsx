import { Box, Typography } from '@mui/material';
import { usePalette } from '../../../hooks';
import { ColumnTypeTexts } from '../../../components';
import { AddColumnResponse } from '../../../interfaces';
import { EditLeftBarConstraintsArea } from './EditLeftBarConstraintsArea';

export const EditLeftBarColumnArea = (props: AddColumnResponse) => {
	const palette = usePalette();

	return (
		<Box
			width="100%"
			padding="0 10px"
			borderBottom={`solid 1px ${palette.layout.editLayout.leftBar.column.line}`}
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="25px"
			>
				<Typography
					variant="body2"
					fontSize="0.75rem"
					color="text.secondary"
					noWrap
				>
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
				<EditLeftBarConstraintsArea {...props} />
				<ColumnTypeTexts type={props.type} />
			</Box>
		</Box>
	);
};
