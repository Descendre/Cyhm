import { Box } from '@mui/material';
import { TopProjectTable } from '../block';

export const TopProjectTableArea = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="start"
			flexGrow={1}
			width="100%"
			height="calc(100% - 50px)"
			padding="15px 0"
			margin="15px 0"
			sx={{
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			<TopProjectTable />
		</Box>
	);
};
