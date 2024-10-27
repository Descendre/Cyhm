import { Add } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';
import { EditLeftBarTableAddColumnIconProps } from '../../../interfaces';

export const EditLeftBarTableAddColumnIcon = ({
	tableId,
}: EditLeftBarTableAddColumnIconProps) => {
	const palette = usePalette();
	const { setAddColumnIndex } = useLayout();

	return (
		<Add
			fontSize="small"
			titleAccess="カラムを追加"
			onClick={() => setAddColumnIndex(tableId)}
			sx={{
				cursor: 'pointer',
				color: palette.text.secondary,
			}}
		/>
	);
};
