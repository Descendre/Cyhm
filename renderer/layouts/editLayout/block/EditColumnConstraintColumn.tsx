import { Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useLayout } from '../../../hooks';
import { EditColumnConstraintPrimaryKeySelect } from '../atom';
import { EditColumnConstraintColumnProps } from '../../../interfaces';

export const EditColumnConstraintColumn = ({
	type,
}: EditColumnConstraintColumnProps) => {
	const { handleGetConstraintIcon } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="40px"
		>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				width="35%"
				height="100%"
			>
				{handleGetConstraintIcon(type, true, '1.1rem', '0.7rem')}
			</Box>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				width="60%"
				height="100%"
			>
				{type === 'PRIMARY_KEY' ? (
					<EditColumnConstraintPrimaryKeySelect />
				) : (
					<></>
				)}
			</Box>
			<Box
				display="flex"
				justifyContent="end"
				alignItems="center"
				width="5%"
				height="100%"
			>
				<Delete
					titleAccess="制約を削除"
					fontSize="small"
					color="error"
					sx={{
						cursor: 'pointer',
					}}
				/>
			</Box>
		</Box>
	);
};
