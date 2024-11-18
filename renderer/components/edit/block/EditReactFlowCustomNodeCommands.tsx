import { Box } from '@mui/material';
import { EditReactFlowCustomNodeCommandsProps } from '../../../interfaces';
import {
	EditReactFlowCommandsAddColumnIcon,
	EditReactFlowCommandsConstraintIcon,
	EditReactFlowCommandsEditIcon,
} from '../atom';

export const EditReactFlowCustomNodeCommands = ({
	table,
}: EditReactFlowCustomNodeCommandsProps) => {
	return (
		<Box
			className="customNodeCommands"
			position="absolute"
			bottom={0}
			right={0}
			display="flex"
			justifyContent="end"
			alignItems="center"
			gap="5px"
			height="30px"
			padding="0 5px"
			onClick={(event: React.MouseEvent<HTMLDivElement>) =>
				event.stopPropagation()
			}
			sx={{
				opacity: table.isEditing ? 1 : 0,
				transform: 'translateY(100%)',
			}}
		>
			<EditReactFlowCommandsConstraintIcon table={table} />
			<EditReactFlowCommandsAddColumnIcon table={table} />
			<EditReactFlowCommandsEditIcon table={table} />
		</Box>
	);
};
