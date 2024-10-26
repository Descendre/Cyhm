import { KeyboardArrowUp } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';

export const EditLeftBarTableCollapseIcon = () => {
	const palette = usePalette();
	const { handleAllTableExpansion } = useLayout();

	return (
		<KeyboardArrowUp
			fontSize="small"
			titleAccess="全て折りたたむ"
			onClick={() => handleAllTableExpansion(false)}
			sx={{
				color: palette.text.disabled,
			}}
		/>
	);
};
