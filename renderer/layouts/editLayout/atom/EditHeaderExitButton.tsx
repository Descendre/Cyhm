import { ExitToApp } from '@mui/icons-material';
import { useProject } from '../../../hooks';
import { Box } from '@mui/material';

export const EditHeaderExitButton = () => {
	const { handleEndProject } = useProject();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			width="40px"
			height="100%"
		>
			<ExitToApp
				titleAccess="終了する"
				color="error"
				fontSize="small"
				onClick={() => handleEndProject()}
				sx={{
					cursor: 'pointer',
				}}
			/>
		</Box>
	);
};
