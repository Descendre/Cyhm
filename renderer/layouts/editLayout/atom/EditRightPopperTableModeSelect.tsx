import { Edit, Lock } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { EditRightPopperTableModeSelectProps } from '../../../interfaces';
import { usePalette, useProject } from '../../../hooks';
import { hexToRgba } from '../../../utils';

export const EditRightPopperTableModeSelect = ({
	table,
}: EditRightPopperTableModeSelectProps) => {
	const palette = usePalette();
	const { handleTableEditMode } = useProject();

	return (
		<ToggleButtonGroup
			size="small"
			fullWidth
			sx={{
				width: '100%',
				height: '35px',
			}}
		>
			<ToggleButton
				disableRipple
				value="lock"
				onClick={() => {
					if (table?.isEditing) {
						handleTableEditMode({ tableId: table.id });
					}
				}}
				sx={{
					gap: '5px',
					fontSize: '0.7rem',
					color: table?.isEditing
						? palette.text.disabled
						: palette.primary.main,
					borderRadius: '20px 0 0 20px',
					backgroundColor: hexToRgba({
						hex: table?.isEditing
							? palette.text.disabled
							: palette.primary.main,
						alpha: table?.isEditing ? 0 : 0.15,
					}),
					'&:hover': {
						backgroundColor: hexToRgba({
							hex: table?.isEditing
								? palette.text.disabled
								: palette.primary.main,
							alpha: 0.15,
						}),
					},
				}}
			>
				<Lock
					fontSize="small"
					sx={{
						fontSize: '1.1rem',
					}}
				/>
				ロックモード
			</ToggleButton>
			<ToggleButton
				disableRipple
				value="edit"
				onClick={() => {
					if (!table?.isEditing) {
						handleTableEditMode({ tableId: table.id });
					}
				}}
				sx={{
					gap: '5px',
					fontSize: '0.7rem',
					color: table?.isEditing
						? palette.primary.main
						: palette.text.disabled,
					borderRadius: '0 20px 20px 0',
					backgroundColor: hexToRgba({
						hex: table?.isEditing
							? palette.primary.main
							: palette.text.disabled,
						alpha: table?.isEditing ? 0.15 : 0,
					}),
					'&:hover': {
						backgroundColor: hexToRgba({
							hex: table?.isEditing
								? palette.primary.main
								: palette.text.disabled,
							alpha: 0.15,
						}),
					},
				}}
			>
				<Edit
					fontSize="small"
					sx={{
						fontSize: '1.1rem',
					}}
				/>
				編集モード
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
