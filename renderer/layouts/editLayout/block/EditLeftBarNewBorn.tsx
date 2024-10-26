import { Box } from '@mui/material';
import { usePalette } from '../../../hooks';
import { EditLeftBarNewBornInput } from '../atom';
import { EditLeftBarNewBornProps } from '../../../interfaces';

export const EditLeftBarNewBorn = ({ mode }: EditLeftBarNewBornProps) => {
	const palette = usePalette();
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			height="25px"
			padding="0 5px"
			border={`solid 1px ${palette.primary.main}`}
		>
			<EditLeftBarNewBornInput mode={mode} />
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				gap="5px"
			></Box>
		</Box>
	);
};
