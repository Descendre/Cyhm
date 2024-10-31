import { Edit, EditOff } from '@mui/icons-material';
import { usePalette, useProject } from '../../../hooks';
import { EditLeftBarToggleEditIconProps } from '../../../interfaces';
import { Box } from '@mui/material';

export const EditLeftBarToggleEditIcon = ({
	table,
}: EditLeftBarToggleEditIconProps) => {
	const palette = usePalette();
	const { handleTableEditMode } = useProject();

	return (
		<Box
			title={table.isEditing ? '編集中のテーブル' : '編集ロック中'}
			onClick={() => handleTableEditMode({ tableId: table.id })}
			sx={{
				cursor: 'pointer',
				fontSize: '0.9rem',
			}}
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
			{table.isEditing ? (
				<Edit
					fontSize="small"
					color="primary"
					sx={{
						color: palette.primary.main,
						pointerEvents: 'none',
						fontSize: '0.9rem',
					}}
				/>
			) : (
				<EditOff
					fontSize="small"
					color="primary"
					sx={{
						color: palette.text.disabled,
						pointerEvents: 'none',
						fontSize: '0.9rem',
					}}
				/>
			)}
		</Box>
	);
};
