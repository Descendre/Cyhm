import { Box } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { FormatListBulleted } from '@mui/icons-material';

export const EditRightPopperListIcon = () => {
	const palette = usePalette();
	const { setIsEditRightPopper } = useLayout();

	return (
		<Box
			title="ポッパーを非表示"
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
			onClick={() => setIsEditRightPopper(false)}
			sx={{
				cursor: 'pointer',
			}}
		>
			<FormatListBulleted
				fontSize="small"
				sx={{
					color: palette.text.disabled,
					pointerEvents: 'none',
				}}
			/>
		</Box>
	);
};
