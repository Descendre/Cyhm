import { Add } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';

export const EditLeftBarAddTableIcon = () => {
	const palette = usePalette();
	const { setIsTableAddMode } = useLayout();

	return (
		<Add
			fontSize="small"
			titleAccess="テーブルを追加"
			onClick={() => setIsTableAddMode(true)}
			sx={{
				color: palette.text.disabled,
				cursor: 'pointer',
			}}
		/>
	);
};
