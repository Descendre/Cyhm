import { Box } from '@mui/material';
import { EditColumnConstraintSettingAreaProps } from '../../../interfaces';
import { EditColumnConstraintSettingHeader } from '../atom';
import { EditColumnConstraintCurrentConstraints } from './EditColumnConstraintCurrentConstraints';

export const EditColumnConstraintSettingArea = ({
	column,
}: EditColumnConstraintSettingAreaProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			gap="30px"
			flexDirection="column"
			width="100%"
		>
			<EditColumnConstraintSettingHeader column={column} />
			{column.columnConstraints.length > 0 && (
				<EditColumnConstraintCurrentConstraints column={column} />
			)}
		</Box>
	);
};
