'ue client';
import { Box } from '@mui/material';
import { LoginButton } from '../atom';
import { signIn } from 'next-auth/react';
import { usePalette } from '../../../hooks';

export const LoginButtonArea = () => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			gap="15px"
			width="60%"
			padding="50px 0"
			borderRadius="10px"
			bgcolor={palette.area.primary}
		>
			<LoginButton
				src="/google.svg"
				text="Googleでログイン"
				onClick={() => signIn('google')}
			/>
			<LoginButton
				src="/github-dark.svg"
				text="Githubでログイン"
				onClick={() => signIn('github')}
			/>
		</Box>
	);
};
