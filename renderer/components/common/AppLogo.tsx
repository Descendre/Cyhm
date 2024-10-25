import { Avatar } from '@mui/material';
import { AppLogoProps } from '../../interfaces';

export const AppLogo = ({ width, height }: AppLogoProps) => {
	return (
		<Avatar
			src={'/SOZO_logo_transparent2.svg'}
			variant="square"
			sx={{
				width: width,
				height: height,
			}}
		/>
	);
};
