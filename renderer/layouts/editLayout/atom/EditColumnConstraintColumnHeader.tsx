import { Box, Typography } from '@mui/material';
import { EditColumnConstraintColumnHeaderProps } from '../../../interfaces';
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';

export const EditColumnConstraintColumnHeader = ({
	table,
	column,
}: EditColumnConstraintColumnHeaderProps) => {
	const palette = usePalette();
	const {
		handleToggleColumnConstraintExpansion,
		handleGetColumnTypeText,
		setSelectedConstraintColumnId,
	} = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			height="25px"
			padding="0 5px"
			fontWeight="bold"
			sx={{
				cursor: 'pointer',
			}}
			onClick={() => setSelectedConstraintColumnId(column.id)}
		>
			{handleGetColumnTypeText(column.type, false, '', '')}
			<Typography
				flexGrow={1}
				variant="body2"
				fontSize="0.7rem"
				noWrap
				marginLeft="5px"
				sx={{
					userSelect: 'none',
				}}
			>
				{column.name}
			</Typography>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="2px"
				height="100%"
			>
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
				<Add
					titleAccess="制約を追加"
					fontSize="small"
					sx={{
						fontSize: '1.1rem',
						color: palette.text.secondary,
						cursor: 'pointer',
					}}
				/>
			</Box>
		</Box>
	);
};
