import { Box, Divider, Typography } from '@mui/material';
import { EditLeftBarTableHeaderProps } from '../../../interfaces';
import {
	EditLeftBarTableAddColumnIcon,
	EditLeftBarTableExpandIcon,
	EditLeftBarToggleEditIcon,
} from '../atom';
import { usePalette } from '../../../hooks';

export const EditLeftBarTableHeader = ({
	table,
}: EditLeftBarTableHeaderProps) => {
	const palette = usePalette();

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="25px"
				padding="0 5px"
				bgcolor={table.color}
				sx={{
					userSelect: 'none',
				}}
			>
				<Typography
					variant="body2"
					fontSize="0.75rem"
					noWrap
					flexGrow={1}
					color={
						table?.isEditing ? palette.text.primary : palette.text.disabled
					}
					sx={{ textDecoration: table.isEditing ? 'none' : 'line-through' }}
				>
					{table.name}
				</Typography>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="5px"
				>
					<EditLeftBarTableExpandIcon
						table={table}
						isExpanded={table.isExpanded}
					/>
					<EditLeftBarTableAddColumnIcon table={table} />
					<EditLeftBarToggleEditIcon table={table} />
				</Box>
			</Box>

			<Divider
				sx={{
					width: '100%',
				}}
			/>
		</>
	);
};
