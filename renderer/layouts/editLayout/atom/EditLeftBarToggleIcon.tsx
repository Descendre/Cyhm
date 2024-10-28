import { Subject } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';

export const EditLeftBarToggleIcon = () => {
	const palette = usePalette();
	const { setIsEditLeftBar } = useLayout();
	return (
		<Subject
			fontSize="small"
			titleAccess="レフトバーを非表示"
			onClick={() => setIsEditLeftBar(false)}
			sx={{
				cursor: 'pointer',
				color: palette.text.secondary,
			}}
		/>
	);
};
