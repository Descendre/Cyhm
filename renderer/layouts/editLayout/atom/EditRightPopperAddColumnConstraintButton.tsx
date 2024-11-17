import { Button, Typography } from '@mui/material';
import { EditRightPopperAddColumnConstraintButtonProps } from '../../../interfaces';
import { useLayout, useProject } from '../../../hooks';

export const EditRightPopperAddColumnConstraintButton = ({
	table,
	column,
	openModal,
}: EditRightPopperAddColumnConstraintButtonProps) => {
	const { setAddConstraintColumnId } = useProject();
	const { setConstraintEditingTableId } = useLayout();

	return (
		<>
			<Button
				size="small"
				disabled={!table.isEditing}
				disableTouchRipple
				sx={{
					width: '50%',
					height: '30px',
				}}
				onClick={() => {
					setConstraintEditingTableId(table.id);
					setAddConstraintColumnId(column.id);
					openModal('columnConstraintModal');
				}}
			>
				<Typography variant="body2" fontSize="0.7rem">
					{`制約の設定 (${column.columnConstraints.length}件)`}
				</Typography>
			</Button>
		</>
	);
};
