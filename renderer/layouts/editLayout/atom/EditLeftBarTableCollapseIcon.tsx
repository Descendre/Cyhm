import { KeyboardArrowUp } from '@mui/icons-material';
import { usePalette } from '../../../hooks';

export const EditLeftBarTableCollapseIcon = () => {
	const palette = usePalette();
	return (
		<KeyboardArrowUp
			fontSize="small"
			titleAccess="全て折りたたむ"
			sx={{
				color: palette.text.disabled,
			}}
		/>
	);
};
