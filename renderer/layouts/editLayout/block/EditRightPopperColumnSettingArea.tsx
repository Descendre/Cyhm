import { Box, Divider } from '@mui/material';
import { EditRightPopperColumnSettingAreaProps } from '../../../interfaces';
import { useLayout, useModal, usePalette } from '../../../hooks';
import { Circle, Rule, Tune, ViewColumn } from '@mui/icons-material';
import {
	EditRightPopperAddColumnConstraintButton,
	EditRightPopperColumnHeader,
	EditRightPopperColumnNameInput,
	EditRightPopperColumnTypeSelect,
} from '../atom';
import { AppModal } from '../../../components';
import { EditColumnConstraint } from '../section';

export const EditRightPopperColumnSettingArea = ({
	table,
}: EditRightPopperColumnSettingAreaProps) => {
	const palette = usePalette();
	const { columns } = useLayout();
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				flexDirection="column"
				gap="20px"
				width="100%"
				padding="20px 0"
			>
				{columns?.[table?.id]?.map((column) => (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						gap="20px"
						width="100%"
						key={column.id}
					>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							flexDirection="column"
							gap="15px"
							width="100%"
						>
							<EditRightPopperColumnHeader table={table} />
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								gap="10px"
								width="100%"
							>
								<ViewColumn
									titleAccess="カラム名を変更"
									fontSize="small"
									sx={{
										color: palette.text.disabled,
										fontSize: '1.1rem',
										cursor: 'pointer',
									}}
								/>
								<EditRightPopperColumnNameInput column={column} table={table} />
							</Box>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								gap="10px"
								width="100%"
							>
								<Tune
									titleAccess="タイプを選択"
									fontSize="small"
									sx={{
										color: palette.text.disabled,
										fontSize: '1.1rem',
										cursor: 'pointer',
									}}
								/>
								<EditRightPopperColumnTypeSelect
									column={column}
									table={table}
								/>
							</Box>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								gap="10px"
								width="100%"
							>
								<Rule
									titleAccess="制約を追加"
									fontSize="small"
									sx={{
										color: palette.text.disabled,
										fontSize: '1.1rem',
										cursor: 'pointer',
									}}
								/>
								{column.columnConstraints.length === 0 ? (
									<EditRightPopperAddColumnConstraintButton
										openModal={openModal}
										table={table}
									/>
								) : (
									<></>
								)}
							</Box>
						</Box>
						<Divider
							sx={{
								width: '100%',
								margin: '0 auto',
							}}
						/>
					</Box>
				))}
			</Box>

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
