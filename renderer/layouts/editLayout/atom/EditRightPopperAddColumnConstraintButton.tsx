import { Add, Circle } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { EditRightPopperAddColumnConstraintButtonProps } from '../../../interfaces';
import { AppModal } from '../../../components';
import { useModal } from '../../../hooks';
import { EditColumnConstraint } from '../section';

export const EditRightPopperAddColumnConstraintButton = ({
	table,
}: EditRightPopperAddColumnConstraintButtonProps) => {
	const { isOpen, openModal, closeModal } = useModal();

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
				onClick={() => openModal('columnConstraintModal')}
			>
				<Typography variant="body2" fontSize="0.7rem">
					制約を追加
				</Typography>
			</Button>

			<AppModal
				isOpen={isOpen('columnConstraintModal')}
				closeModal={() => closeModal('columnConstraintModal')}
				width="75vw"
				height="85vh"
				maxWidth="800px"
				maxHeight="640px"
				icon={
					<Circle
						fontSize="small"
						sx={{ color: table.color, fontSize: '1.1rem' }}
					/>
				}
				title={`カラム制約の詳細設定 (${table.name})`}
			>
				<EditColumnConstraint table={table} />
			</AppModal>
		</>
	);
};
