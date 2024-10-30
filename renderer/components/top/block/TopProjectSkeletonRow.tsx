import { Skeleton } from '@mui/material';
import { usePalette } from '../../../hooks';

export const TopProjectSkeletonRow = () => {
	const palette = usePalette();
	return (
		<Skeleton
			variant="rectangular"
			width="100%"
			height="60px"
			sx={{
				minHeight: '60px',
				bgcolor: palette.components.top.projectTable.skeleton.bg,
			}}
		/>
	);
};
