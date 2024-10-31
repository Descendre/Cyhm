import { Box, Divider, Typography } from '@mui/material';
import { usePalette } from '../../../hooks';
import { EditRightPopperSettingHeaderProps } from '../../../interfaces';

export const EditRightPopperSettingHeader = ({
	title,
}: EditRightPopperSettingHeaderProps) => {
	const palette = usePalette();

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				width="100%"
				height="30px"
			>
				<Typography
					variant="body2"
					fontSize="0.8rem"
					color={palette.text.secondary}
					width="100%"
				>
					{title}
				</Typography>
			</Box>
			<Divider
				sx={{
					width: '100%',
				}}
			/>
		</>
	);
};
