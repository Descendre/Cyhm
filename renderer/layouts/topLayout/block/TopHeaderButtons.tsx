import { Box } from '@mui/material';
import { TopHeaderAvatar, TopHeaderButton } from '../atom';
import { GitHub, Help, Settings } from '@mui/icons-material';

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
				icon={<Help />}
				text="ヘルプ"
				onClick={() => console.log()}
			/>
			<TopHeaderButton
				icon={<Settings />}
				text="設定"
				onClick={() => console.log()}
			/>
			<TopHeaderAvatar />
		</Box>
	);
};
