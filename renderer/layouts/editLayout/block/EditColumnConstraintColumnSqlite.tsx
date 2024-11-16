import { Box } from '@mui/material';
import { Cancel, Delete } from '@mui/icons-material';
import { useLayout, useModal, usePalette, useProject } from '../../../hooks';
import {
	EditColumnConstraintSqliteDeleteConstraintModalContent,
	EditColumnConstraintSqlitePrimaryKeySelect,
} from '../atom';
import { EditColumnConstraintColumnSqliteProps } from '../../../interfaces';
import { AppSelectModal } from '../../../components';

export const EditColumnConstraintColumnSqlite = ({
	type,
	column,
	constraint,
}: EditColumnConstraintColumnSqliteProps) => {
	const { isConstraintDeleting, handleGetConstraintIcon } = useLayout();
	const { handleDeleteConstraint } = useProject();
	const { isOpen, openModal, closeModal } = useModal();
	const palette = usePalette();

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				width="100%"
				height="60px"
				sx={{
					'&:hover .deleteIcon': {
						display: 'block',
					},
				}}
			>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					width="35%"
					height="100%"
				>
					{handleGetConstraintIcon(type, true, '1.1rem', '0.7rem')}
				</Box>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					width="60%"
					height="100%"
				>
					{type === 'PRIMARY_KEY' ? (
						<EditColumnConstraintSqlitePrimaryKeySelect
							column={column}
							constraint={constraint}
						/>
					) : (
						<></>
					)}
				</Box>
				<Box
					display="flex"
					justifyContent="end"
					alignItems="center"
					width="5%"
					height="100%"
				>
					<Delete
						className="deleteIcon"
						titleAccess="制約を削除"
						fontSize="small"
						color="error"
						onClick={() => openModal('columnConstraintModal')}
						sx={{
							display: 'none',
							cursor: 'pointer',
						}}
					/>
				</Box>
			</Box>

			<AppSelectModal
				outerClose
				loading={isConstraintDeleting}
				isOpen={isOpen('columnConstraintModal')}
				closeModal={() => closeModal('columnConstraintModal')}
				acceptColor="error"
				rejectColor="inherit"
				acceptFunc={() => {
					handleDeleteConstraint({
						id: constraint.id,
						type: constraint.type,
						projectId: column.projectId,
					});
				}}
				rejectFunc={() => closeModal('columnConstraintModal')}
				acceptIcon={
					<Delete
						fontSize="small"
						sx={{ color: palette.text.primary, fontSize: '1.1rem' }}
					/>
				}
				rejectIcon={
					<Cancel
						fontSize="small"
						sx={{ color: palette.text.primary, fontSize: '1.1rem' }}
					/>
				}
				acceptText="削除"
				rejectText="キャンセル"
			>
				<EditColumnConstraintSqliteDeleteConstraintModalContent
					column={column}
					constraint={constraint}
				/>
			</AppSelectModal>
		</>
	);
};
