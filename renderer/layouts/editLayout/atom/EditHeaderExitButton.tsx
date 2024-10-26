import { ExitToApp } from '@mui/icons-material';
import { useLayout } from '../../../hooks';

export const EditHeaderExitButton = () => {
	const { handleEndProject } = useLayout();
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
