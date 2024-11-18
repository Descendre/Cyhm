'use client';
import { Box, IconButton } from '@mui/material';
import { useLayout, useModal, usePalette, useProject } from '../../../hooks';
import { Circle, Rule } from '@mui/icons-material';
import { EditReactFlowCommandsConstraintIconProps } from '../../../interfaces';
import { AppModal } from '../../common';
import { EditColumnConstraint } from '../../../layouts/editLayout/section';
import { hexToRgba } from '../../../utils';

export const EditReactFlowCommandsConstraintIcon = ({
	table,
}: EditReactFlowCommandsConstraintIconProps) => {
	const {
		tables,
		columns,
		constraintEditingTableId,
		setConstraintEditingTableId,
	} = useLayout();
	const { setAddConstraintColumnId } = useProject();
	const palette = usePalette();
	const { isOpen, openModal, closeModal } = useModal();

	const columnEditingTable = tables[constraintEditingTableId];

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		if (
			!columns[table.id] ||
			columns[table.id].length === 0 ||
			!table.isEditing
		)
			return;
		setConstraintEditingTableId(table.id);
		setAddConstraintColumnId(columns[table.id][0].id);
		openModal('columnConstraintModal');
	};

	return (
		<>
			<IconButton
				size="small"
				title="カラム制約"
				disabled={!table.isEditing}
				disableRipple
				onClick={(event) => handleClick(event)}
				sx={{
					position: 'relative',
					backgroundColor:
						palette.components.edit.reactFlow.tableHeader.default,
					overflow: 'hidden',
				}}
			>
				<Rule
					fontSize="small"
					sx={{
						fontSize: '0.85rem',
					}}
				/>
				<Box
					position="absolute"
					display={table.isEditing ? 'none' : 'block'}
					sx={{
						width: '100%',
						height: '100%',
						bgcolor: hexToRgba({
							hex: palette.components.edit.reactFlow.lockBg,
							alpha: 0.3,
						}),
					}}
				/>
			</IconButton>

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
						sx={{ color: columnEditingTable?.color, fontSize: '1.1rem' }}
					/>
				}
				title={`カラム制約の詳細設定 - ${columnEditingTable?.name}`}
			>
				<EditColumnConstraint />
			</AppModal>
		</>
	);
};
