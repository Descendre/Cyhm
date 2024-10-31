import { Box } from '@mui/material';
import { EditLayoutProps } from '../../interfaces';
import {
	EditFooter,
	EditHeader,
	EditLeftBar,
	EditLeftBarReborn,
	EditMain,
	EditRightPopper,
	EditRightPopperFix,
} from './section';
import { useLayout } from '../../hooks';

export const EditLayout = ({ children }: EditLayoutProps) => {
	const { tables, isEditLeftBar, isEditRightPopper, lastSelectedTableId } =
		useLayout();
	const lastSelectedTableInfo =
		lastSelectedTableId && tables && tables[lastSelectedTableId]
			? tables[lastSelectedTableId]
			: null;

	return (
		<>
			<Box width="100%" height="100vh">
				<EditHeader />
				<Box
					position="relative"
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="100%"
					height="calc(100% - 50px)"
				>
					{isEditLeftBar ? <EditLeftBar /> : <EditLeftBarReborn />}
					<EditMain>
						{children}
						<EditFooter />
					</EditMain>
					{isEditRightPopper && lastSelectedTableInfo ? (
						<EditRightPopper />
					) : (
						<EditRightPopperFix table={lastSelectedTableInfo} />
					)}
				</Box>
			</Box>
		</>
	);
};
