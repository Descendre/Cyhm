import { Typography } from '@mui/material';
import { usePalette, useProject } from '../../../hooks';

export const EditHeaderProjectTitle = () => {
	const palette = usePalette();
	const { currentProject } = useProject();

	return (
		<Typography
			variant="body2"
			sx={{ fontSize: '0.8rem' }}
			color={palette.text.disabled}
			noWrap
		>
			{currentProject?.name}
		</Typography>
	);
};
