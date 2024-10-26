import { Box } from '@mui/material';
import { TopHeaderAvatar, TopHeaderButton } from '../atom';
import { GitHub, Info, Notifications, Settings } from '@mui/icons-material';

export const TopHeaderButtons = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			gap="10px"
			height="50px"
		>
			<TopHeaderButton
				icon={<GitHub />}
				text="github"
				onClick={() => console.log()}
			/>
			<TopHeaderButton
				icon={<Notifications />}
				text="通知"
				onClick={() => console.log()}
			/>
			<TopHeaderButton
				icon={<Settings />}
				text="設定"
				onClick={() => console.log()}
			/>
			<TopHeaderButton
				icon={<Info />}
				text="クレジット"
				onClick={() => console.log()}
			/>
			<TopHeaderAvatar />
		</Box>
	);
};
