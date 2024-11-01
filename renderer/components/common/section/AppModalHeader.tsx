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
			width="100%"
			height="40px"
			padding="0 10px"
			bgcolor={palette.components.common.appModal.header.bg}
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="5px"
				height="100%"
				color={palette.text.secondary}
			>
				{icon}
				<Typography variant="body2" fontSize="0.8rem">
					{title}
				</Typography>
			</Box>
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
