import { KeyboardArrowDown } from '@mui/icons-material';
import { usePalette } from '../../../hooks';

export const EditLeftBarTableExpandIcon = () => {
	const palette = usePalette();
	return (
		<KeyboardArrowDown
			fontSize="small"
			titleAccess="全て展開"
			sx={{
				color: palette.text.disabled,
			}}
		/>
	);
};
