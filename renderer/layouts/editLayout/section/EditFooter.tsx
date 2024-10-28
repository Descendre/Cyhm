import { Box } from '@mui/material';
import { EditToolBar } from '../block';
import { useLayout } from '../../../hooks';

export const EditFooter = () => {
	const { isEditLeftBar } = useLayout();

	return (
		<Box
			position="fixed"
			bottom={0}
			display="flex"
			justifyContent="center"
			alignItems="start"
			width={isEditLeftBar ? 'calc(100% - 300px)' : '100%'}
			height="70px"
			paddingTop="20px"
			sx={{
				pointerEvents: 'none',
			}}
		>
			<EditToolBar />
		</Box>
	);
};
