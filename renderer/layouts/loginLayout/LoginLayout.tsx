import { Box } from '@mui/material';
import { LoginLayoutProps } from '../../interfaces';
import { LoginHeader, LoginMain } from './section';

export const LoginLayout = ({ children }: LoginLayoutProps) => {
	return (
		<Box width="100%" height="100vh" maxWidth="800px" margin="0 auto">
			<LoginHeader />
			<LoginMain>{children}</LoginMain>
		</Box>
	);
};
