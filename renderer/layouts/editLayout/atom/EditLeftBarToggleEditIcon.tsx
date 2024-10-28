import { Edit, EditOff } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';
import { EditLeftBarToggleEditIconProps } from '../../../interfaces';

export const EditLeftBarToggleEditIcon = ({
	table,
}: EditLeftBarToggleEditIconProps) => {
	const palette = usePalette();
	const { handleTableEditMode } = useLayout();

	return (
		<>
			{table.isEditing ? (
				<Edit
					fontSize="small"
					titleAccess="編集中のテーブル"
					color="primary"
					onClick={() => handleTableEditMode(table.id)}
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
					onClick={() => handleTableEditMode(table.id)}
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
