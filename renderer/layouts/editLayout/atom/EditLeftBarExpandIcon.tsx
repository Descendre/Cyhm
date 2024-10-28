import { KeyboardArrowDown } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';

export const EditLeftBarTableExpandIcon = () => {
	const palette = usePalette();
	const { handleAllTableExpansion } = useLayout();

	return (
		<KeyboardArrowDown
			fontSize="small"
			titleAccess="全て展開"
			onClick={() => handleAllTableExpansion(true)}
			sx={{
				color: palette.text.disabled,
				cursor: 'pointer',
			}}
		/>
	);
};
