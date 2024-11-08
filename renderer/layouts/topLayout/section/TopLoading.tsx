import { Box } from '@mui/material';
import { usePalette } from '../../../hooks';
import { hexToRgba } from '../../../utils';
import { TopLoadingProps } from '../../../interfaces';
import { TopLoadingCircularProgress } from '../atom';

export const TopLoading = ({ text }: TopLoadingProps) => {
	const palette = usePalette();

	return (
		<Box
			zIndex={100}
			position="fixed"
			top={0}
			left={0}
			display="flex"
			justifyContent="center"
			alignItems="center"
			gap="20px"
			width="100vw"
			height="100vh"
			bgcolor={hexToRgba({
				hex: palette.layout.topLayout.CreatingProjectLoading.bg,
				alpha: 0.7,
			})}
		>
			<TopLoadingCircularProgress />
			{text}
		</Box>
	);
};
