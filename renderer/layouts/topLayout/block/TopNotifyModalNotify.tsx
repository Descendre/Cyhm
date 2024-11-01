import { Avatar, Box } from '@mui/material';
import { TopNotifyModalNotifyProps } from '../../../interfaces';
import { TopNotifyModalNotifyTitle } from '../atom';
import { TopNotifyModalInvationCommands } from './TopNotifyModalInvationCommands';

export const TopNotifyModalNotify = ({ notify }: TopNotifyModalNotifyProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="start"
			gap="15px"
			width="100%"
			padding="15px"
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="start"
				height="100%"
			>
				<Avatar src={notify.fromUser.image} />
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				gap="20px"
				flexGrow={1}
				height="100%"
			>
				<TopNotifyModalNotifyTitle notify={notify} />
				{notify.type === 'INVITATION' && (
					<TopNotifyModalInvationCommands notify={notify} />
				)}
			</Box>
		</Box>
	);
};
