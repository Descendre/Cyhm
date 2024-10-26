import { Add } from '@mui/icons-material';
import { usePalette } from '../../../hooks';

export const EditLeftBarTableAddColumnIcon = () => {
	const palette = usePalette();
	return (
		<Add
			fontSize="small"
			titleAccess="カラムを追加"
			sx={{
				cursor: 'pointer',
				color: palette.text.secondary,
			}}
		/>
	);
};
