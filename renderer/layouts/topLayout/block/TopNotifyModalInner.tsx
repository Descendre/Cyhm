import { Box, Divider } from '@mui/material';
import { TopNotifyModalNotify } from './TopNotifyModalNotify';
import { useNotify } from '../../../hooks';

export const TopNotifyModalInner = () => {
	const { notifies } = useNotify();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="100%"
			height="100%"
			sx={{
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			{notifies?.map((notify) => (
				<Box key={notify.id} width="100%" height="100%">
					<TopNotifyModalNotify notify={notify} />
					<Divider
						sx={{
							width: '90%',
							margin: '0 auto',
						}}
					/>
				</Box>
			))}
		</Box>
	);
};
