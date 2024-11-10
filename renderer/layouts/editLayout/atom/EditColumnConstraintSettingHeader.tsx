import { Box, Button, Divider, Typography } from '@mui/material';
import { EditColumnConstraintSettingHeaderProps } from '../../../interfaces';
import { Add } from '@mui/icons-material';
import { useLayout } from '../../../hooks';

export const EditColumnConstraintSettingHeader = ({
	column,
}: EditColumnConstraintSettingHeaderProps) => {
	const { handleGetColumnTypeText } = useLayout();

	return (
		<Box width="100%">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="40px"
			>
				{handleGetColumnTypeText(column?.type, false, '1.1rem', '')}
				<Typography flexGrow={1} variant="body1" marginLeft="5px" noWrap>
					{column?.name}
				</Typography>
				<Button
					size="small"
					disableTouchRipple
					sx={{
						height: '30px',
						padding: '0 10px',
					}}
					endIcon={<Add />}
				>
					<Typography variant="body2" fontSize="0.7rem">
						制約を追加
					</Typography>
				</Button>
			</Box>
			<Divider
				sx={{
					width: '100%',
				}}
			/>
		</Box>
	);
};
