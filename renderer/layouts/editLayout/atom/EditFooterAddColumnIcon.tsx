import { TableRows } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';
import { Box } from '@mui/material';

export const EditFooterAddColumnIcon = () => {
	const palette = usePalette();
	const {
		EditFooterAddColumnIconRef,
		setAddColumnIndex,
		selectedTable,
		setIsEditLeftBar,
	} = useLayout();

	const handleClick = (): void => {
		setIsEditLeftBar(true);
		setAddColumnIndex(selectedTable.id);
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				ref={EditFooterAddColumnIconRef}
			>
				{selectedTable ? (
					<TableRows
						titleAccess="カラムを追加"
						fontSize="small"
						onClick={handleClick}
						sx={{
							cursor: 'pointer',
						}}
					/>
				) : (
					<TableRows
						titleAccess="カラムを追加"
						fontSize="small"
						sx={{
							color: palette.text.disabled,
							cursor: 'pointer',
						}}
					/>
				)}
			</Box>
		</>
	);
};
