import { Box } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { FormatListBulleted } from '@mui/icons-material';
import { EditRightPopperFixProps } from '../../../interfaces';

export const EditRightPopperFix = ({ table }: EditRightPopperFixProps) => {
	const palette = usePalette();
	const { setIsEditRightPopper } = useLayout();

	return (
		<>
			{table && (
				<Box
					position="absolute"
					top="5px"
					right="5px"
					border={`solid 1px transparent`}
					sx={{
						pointerEvents: 'none',
					}}
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						width="100%"
						height="35px"
						padding="10px"
					>
						<FormatListBulleted
							fontSize="small"
							titleAccess="ポッパーを表示"
							onClick={() => setIsEditRightPopper(true)}
							sx={{
								cursor: 'pointer',
								color: palette.text.secondary,
								pointerEvents: 'auto',
							}}
						/>
					</Box>
				</Box>
			)}
		</>
	);
};
