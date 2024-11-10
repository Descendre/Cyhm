import { Box, Divider, Typography } from '@mui/material';
import { EditColumnConstraintColumnSectionProps } from '../../../interfaces';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';

export const EditColumnConstraintColumnSection = ({
	children,
	table,
	column,
}: EditColumnConstraintColumnSectionProps) => {
	const palette = usePalette();
	const { handleToggleColumnConstraintExpansion } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			width="100%"
			height="50px"
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				gap="10px"
				width="100%"
				height="30px"
			>
				<Typography
					flexGrow={1}
					variant="body1"
					noWrap
					width="100%"
					height="100%"
					color="text.secondary"
				>
					{column.name}
				</Typography>
				{column.isConstraintExpand ? (
					<ExpandMore
						onClick={() =>
							handleToggleColumnConstraintExpansion({
								tableId: table.id,
								columnId: column.id,
							})
						}
						titleAccess="制約を非表示"
						fontSize="small"
						sx={{
							fontSize: '1.1rem',
							color: palette.text.secondary,
							cursor: 'pointer',
						}}
					/>
				) : (
					<ExpandLess
						onClick={() =>
							handleToggleColumnConstraintExpansion({
								tableId: table.id,
								columnId: column.id,
							})
						}
						titleAccess="制約を表示"
						fontSize="small"
						sx={{
							fontSize: '1.1rem',
							color: palette.text.secondary,
							cursor: 'pointer',
						}}
					/>
				)}
			</Box>
			<Divider
				sx={{
					width: '100%',
				}}
			/>
			{children}
		</Box>
	);
};
