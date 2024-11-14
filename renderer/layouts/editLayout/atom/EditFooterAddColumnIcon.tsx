import { TableRows } from '@mui/icons-material';
import { useLayout, usePalette } from '../../../hooks';
import { Box } from '@mui/material';

export const EditFooterAddColumnIcon = () => {
	const palette = usePalette();
	const {
		tables,
		EditFooterAddColumnIconRef,
		selectedTableId,
		setIsEditLeftBar,
		handleSetAddColumnIndex,
	} = useLayout();

	const handleClick = (): void => {
		if (!tables[selectedTableId]) return;
		setIsEditLeftBar(true);
		handleSetAddColumnIndex(tables[selectedTableId]);
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				ref={EditFooterAddColumnIconRef}
			>
				{tables?.[selectedTableId]?.isEditing ? (
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
