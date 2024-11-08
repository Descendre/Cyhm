import { Add } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';
import { EditLeftBarTableAddColumnIconProps } from '../../../interfaces';

export const EditLeftBarTableAddColumnIcon = ({
	table,
}: EditLeftBarTableAddColumnIconProps) => {
	const palette = usePalette();
	const { handleSetAddColumnIndex } = useLayout();

	return (
		<Add
			fontSize="small"
			titleAccess="カラムを追加"
			onClick={() => handleSetAddColumnIndex(table)}
			sx={{
				cursor: 'pointer',
				color: table.isEditing ? palette.text.secondary : palette.text.disabled,
			}}
		/>
	);
};
