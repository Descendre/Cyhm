import { Box } from '@mui/material';
import { TopHeaderAvatar, TopHeaderButton } from '../atom';
import { GitHub } from '@mui/icons-material';
export const TopHeaderButtons = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			gap="10px"
			height="100%"
		>
			<TopHeaderButton
				icon={<GitHub />}
				text="github"
				onClick={() => console.log()}
			/>
			<TopHeaderButton
				icon={<GitHub />}
				text="github"
				onClick={() => console.log()}
			/>
			<TopHeaderButton
				icon={<GitHub />}
				text="github"
				onClick={() => console.log()}
			/>
			<TopHeaderAvatar />
		</Box>
	);
};
