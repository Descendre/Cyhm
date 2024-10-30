import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { usePalette, useProject } from '../../../hooks';
import { EditLeftBarTableExpandIconProps } from '../../../interfaces';

export const EditLeftBarTableExpandIcon = ({
	tableId,
	isExpanded,
}: EditLeftBarTableExpandIconProps) => {
	const palette = usePalette();
	const { handleTableExpansion } = useProject();

	return (
		<>
			{isExpanded ? (
				<ExpandMore
					fontSize="small"
					titleAccess="カラムを非表示"
					onClick={() => handleTableExpansion({ tableId: tableId })}
					sx={{
						cursor: 'pointer',
						color: palette.text.secondary,
					}}
				/>
			) : (
				<ExpandLess
					fontSize="small"
					titleAccess="カラムを展開"
					onClick={() => handleTableExpansion({ tableId: tableId })}
					sx={{
						cursor: 'pointer',
						color: palette.text.secondary,
					}}
				/>
			)}
		</>
	);
};
