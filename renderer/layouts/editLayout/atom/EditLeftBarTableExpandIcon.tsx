import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { usePalette, useProject } from '../../../hooks';
import { EditLeftBarTableExpandIconProps } from '../../../interfaces';
import { Box } from '@mui/material';

export const EditLeftBarTableExpandIcon = ({
	table,
	isExpanded,
}: EditLeftBarTableExpandIconProps) => {
	const palette = usePalette();
	const { handleTableExpansion } = useProject();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
			title={isExpanded ? 'カラムを非表示' : 'カラムを展開'}
			onClick={() => handleTableExpansion({ tableId: table.id })}
			sx={{
				cursor: 'pointer',
				color: palette.text.secondary,
			}}
		>
			{isExpanded ? (
				<ExpandMore
					fontSize="small"
					sx={{
						color: table.isEditing
							? palette.text.secondary
							: palette.text.disabled,
						pointerEvents: 'none',
					}}
				/>
			) : (
				<ExpandLess
					fontSize="small"
					sx={{
						color: table.isEditing
							? palette.text.secondary
							: palette.text.disabled,
						pointerEvents: 'none',
					}}
				/>
			)}
		</Box>
	);
};
