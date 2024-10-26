import { Typography } from '@mui/material';
import { usePalette } from '../../../hooks';

export const EditHeaderProjectTitle = () => {
	const palette = usePalette();
	return (
		<Typography variant="body2" color={palette.text.disabled} noWrap>
			無題Lorem ipsum dolor sit, amet consectet
		</Typography>
	);
};
