import { Box, Divider, Typography } from '@mui/material';
import { EditProjectSettingSectionProps } from '../../../interfaces';

export const EditProjectSettingSection = ({
	title,
	icon,
	color,
	children,
}: EditProjectSettingSectionProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			width="80%"
			margin="0 auto"
		>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				gap="10px"
				width="100%"
				height="40px"
			>
				{icon}
				<Typography variant="body1" color={color} noWrap flexGrow={1}>
					{title}
				</Typography>
			</Box>
			<Divider
				sx={{
					width: '100%',
				}}
			/>
			{children}
		</Box>
	);
};
