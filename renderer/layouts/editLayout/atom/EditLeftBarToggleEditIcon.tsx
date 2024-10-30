import { Edit, EditOff } from '@mui/icons-material';
import { usePalette, useProject } from '../../../hooks';
import { EditLeftBarToggleEditIconProps } from '../../../interfaces';

export const EditLeftBarToggleEditIcon = ({
	table,
}: EditLeftBarToggleEditIconProps) => {
	const palette = usePalette();
	const { handleTableEditMode } = useProject();

	return (
		<>
			{table.isEditing ? (
				<Edit
					fontSize="small"
					titleAccess="編集中のテーブル"
					color="primary"
					onClick={() => handleTableEditMode({ tableId: table.id })}
					sx={{
						color: palette.primary.main,
						cursor: 'pointer',
						fontSize: '0.9rem',
					}}
				/>
			) : (
				<EditOff
					fontSize="small"
					titleAccess="編集ロック中"
					color="primary"
					onClick={() => handleTableEditMode({ tableId: table.id })}
					sx={{
						color: palette.text.disabled,
						cursor: 'pointer',
						fontSize: '0.9rem',
					}}
				/>
			)}
		</>
	);
};
