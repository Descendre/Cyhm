import { Box } from '@mui/material';
import { EditHeaderExitButton } from '../atom';
import { EditHeaderProjectSettings } from './EditHeaderProjectSettings';
export const EditHeaderLeftCommands = () => {
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			gap="15px"
			width="35%"
			height="100%"
			padding="0 15px"
		>
			<EditHeaderExitButton />
			<EditHeaderProjectSettings />
		</Box>
	);
};
