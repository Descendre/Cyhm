import { Box } from '@mui/material';
import { EditRightPopperSettingAreaProps } from '../../../interfaces';
import { EditRightPopperSettingHeader } from './EditRightPopperSettingHeader';

export const EditRightPopperSettingArea = ({
	children,
	title,
}: EditRightPopperSettingAreaProps) => {
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="100%"
		>
			<EditRightPopperSettingHeader title={title} />
			{children}
		</Box>
	);
};
