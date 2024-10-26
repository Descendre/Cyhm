import { Box } from '@mui/material';
import { EditHeaderProjectTitle } from '../atom';
import { Settings } from '@mui/icons-material';
import { usePalette } from '../../../hooks';

export const EditHeaderProjectSettings = () => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			gap="10px"
			flexGrow={1}
			width="0px"
			height="100%"
			sx={{
				cursor: 'pointer',
				'&:hover .settingsIcon': {
					opacity: 1,
				},
			}}
		>
			<EditHeaderProjectTitle />
			<Settings
				className="settingsIcon"
				fontSize="small"
				sx={{
					opacity: 0,
					color: palette.text.disabled,
				}}
			/>
		</Box>
	);
};
