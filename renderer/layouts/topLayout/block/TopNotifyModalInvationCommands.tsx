import { Box, Button } from '@mui/material';

export const TopNotifyModalInvationCommands = () => {
	return (
		<Box
			display="flex"
			justifyContent="end"
			alignItems="center"
			gap="15px"
			width="100%"
		>
			<Button
				variant="contained"
				color="secondary"
				size="small"
				disableTouchRipple
				sx={{
					fontSize: '0.8rem',
				}}
			>
				参加しない
			</Button>
			<Button
				variant="contained"
				size="small"
				disableTouchRipple
				sx={{
					fontSize: '0.8rem',
				}}
			>
				参加する
			</Button>
		</Box>
	);
};
