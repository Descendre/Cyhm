import { ExitToApp } from '@mui/icons-material';
import { useProject } from '../../../hooks';

export const EditHeaderExitButton = () => {
	const { handleEndProject } = useProject();

	return (
		<ExitToApp
			titleAccess="終了する"
			color="error"
			fontSize="small"
			onClick={() => handleEndProject()}
			sx={{
				cursor: 'pointer',
			}}
		/>
	);
};
