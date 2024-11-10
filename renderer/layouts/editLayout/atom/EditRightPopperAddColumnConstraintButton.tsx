import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { EditRightPopperAddColumnConstraintButtonProps } from '../../../interfaces';

export const EditRightPopperAddColumnConstraintButton = ({
	table,
	openModal,
}: EditRightPopperAddColumnConstraintButtonProps) => {
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
				endIcon={<Add />}
				onClick={() => {
					openModal('columnConstraintModal');
				}}
			>
				<Typography variant="body2" fontSize="0.7rem">
					制約を追加
				</Typography>
			</Button>
		</>
	);
};
