import { ExpandLess } from '@mui/icons-material';
import { usePalette } from '../../../hooks';

export const EditLeftBarTableExpandIcon = () => {
	const palette = usePalette();
	return (
		<ExpandLess
			fontSize="small"
			titleAccess="カラムを非表示"
			sx={{
				cursor: 'pointer',
				color: palette.text.secondary,
			}}
		/>
	);
};
