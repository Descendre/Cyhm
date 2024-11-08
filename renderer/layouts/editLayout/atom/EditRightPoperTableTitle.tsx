import { Typography } from '@mui/material';
import { usePalette } from '../../../hooks';
import { EditRightPoperTableTitleProps } from '../../../interfaces';

export const EditRightPoperTableTitle = ({
	table,
}: EditRightPoperTableTitleProps) => {
	const palette = usePalette();

	return (
		<Typography
			title={table?.isEditing ? table.name : '編集ロック中'}
			noWrap
			variant="body1"
			color={table?.isEditing ? palette.text.primary : palette.text.disabled}
			sx={{
				flexGrow: 1,
				textDecoration: table?.isEditing ? 'none' : 'line-through',
			}}
		>
			{table?.name}
		</Typography>
	);
};
