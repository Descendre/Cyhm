import { Box } from '@mui/material';
import { EditLayoutProps } from '../../interfaces';
import { EditFooter, EditHeader, EditLeftBar, EditMain } from './section';

export const EditLayout = ({ children }: EditLayoutProps) => {
	return (
		<>
			<Box width="100%" height="100vh">
				<EditHeader />
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="100%"
					height="calc(100% - 50px)"
				>
					<EditLeftBar />
					<EditMain>
						{children}
						<EditFooter />
					</EditMain>
				</Box>
			</Box>
		</>
	);
};
