import { Box, Typography } from '@mui/material';
import { usePalette } from '../../../hooks';
import { AppModalHeaderProps } from '../../../interfaces';
import { Close } from '@mui/icons-material';

export const AppModalHeader = ({
	title,
	icon,
	closeModal,
}: AppModalHeaderProps) => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			gap="5px"
			width="100%"
			height="40px"
			padding="0 10px"
			color={palette.text.secondary}
			bgcolor={palette.components.common.appModal.header.bg}
		>
			{icon}
			<Typography variant="body2" fontSize="0.8rem" noWrap flexGrow={1}>
				{title}
			</Typography>
			<Close
				titleAccess="閉じる"
				color="error"
				fontSize="small"
				onClick={() => closeModal()}
				sx={{
					cursor: 'pointer',
				}}
			/>
		</Box>
	);
};
