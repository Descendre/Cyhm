import { Box } from '@mui/material';
import { EditMainProps } from '../../../interfaces';
import { useLayout } from '../../../hooks';

export const EditMain = ({ children }: EditMainProps) => {
	const { isEditLeftBar } = useLayout();

	return (
		<Box
			position="relative"
			width={isEditLeftBar ? 'calc(100% - 250px)' : '100%'}
			height="100%"
		>
			{children}
		</Box>
	);
};
