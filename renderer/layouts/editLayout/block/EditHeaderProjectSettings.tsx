import { Box } from '@mui/material';
import { EditHeaderProjectTitle } from '../atom';

export const EditHeaderProjectSettings = () => {
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			width="calc(100% - 40px)"
			height="100%"
			sx={{
				cursor: 'pointer',
				'&:hover .settingsIcon': {
					opacity: 1,
				},
			}}
		>
			<EditHeaderProjectTitle />
		</Box>
	);
};
