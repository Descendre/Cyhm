import { Box } from '@mui/material';
import { usePalette } from '../../../hooks';
import { EditLeftBarNewBornInput } from '../atom';
import { EditLeftBarNewBornProps } from '../../../interfaces';

export const EditLeftBarNewBorn = (props: EditLeftBarNewBornProps) => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			height="25px"
			padding="0 5px"
			border={props.mode === 'table' && `solid 1px ${palette.primary.main}`}
		>
			{props.mode === 'table' ? (
				<EditLeftBarNewBornInput mode={props.mode} />
			) : props.mode === 'column' ? (
				<EditLeftBarNewBornInput mode={props.mode} tableId={props.tableId} />
			) : (
				<></>
			)}
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="5px"
			></Box>
		</Box>
	);
};
