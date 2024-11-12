import { Box, Typography } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { EditColumnConstraintNoConstraintDisplayProps } from '../../../interfaces';

export const EditColumnConstraintNoConstraintDisplay = ({
	column,
}: EditColumnConstraintNoConstraintDisplayProps) => {
	const palette = usePalette();
	const { handleSelectColumnConstraintItem } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100px"
		>
			<Typography
				variant="body2"
				fontSize="0.8rem"
				color="text.disabled"
				sx={{
					userSelect: 'none',
				}}
			>
				表示可能なカラムがありません (
				<Box
					component="span"
					onClick={() =>
						handleSelectColumnConstraintItem({ columnId: column.id })
					}
					sx={{
						color: palette.primary.main,
						cursor: 'pointer',
						'&:hover': {
							textDecoration: 'underline',
						},
					}}
				>
					追加する
				</Box>
				)
			</Typography>
		</Box>
	);
};
