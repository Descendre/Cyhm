import { Typography } from '@mui/material';
import { TopNotifyModalNotifyTitleProps } from '../../../interfaces';

export const TopNotifyModalNotifyTitle = ({
	notify,
}: TopNotifyModalNotifyTitleProps) => {
	return (
		<Typography
			variant="body2"
			color="text.primary"
			sx={{
				fontSize: '0.8rem',
				wordBreak: 'break-all',
			}}
		>
			{notify.type === 'INVITATION'
				? `${notify.fromUser.name}さんから「${notify.project?.name}」への招待が届きました。`
				: ''}
		</Typography>
	);
};
