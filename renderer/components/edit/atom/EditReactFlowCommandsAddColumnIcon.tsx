import { Box, IconButton } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { Add } from '@mui/icons-material';
import { EditReactFlowCommandsAddColumnIconProps } from '../../../interfaces';
import { hexToRgba } from '../../../utils';

export const EditReactFlowCommandsAddColumnIcon = ({
	table,
}: EditReactFlowCommandsAddColumnIconProps) => {
	const palette = usePalette();
	const { setSelectedTableId, setIsEditLeftBar, handleSetAddColumnIndex } =
		useLayout();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		setIsEditLeftBar(true);
		setSelectedTableId(table.id);
		handleSetAddColumnIndex(table);
	};

	return (
		<IconButton
			size="small"
			title="カラムを追加"
			disabled={!table.isEditing}
			disableRipple
			onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
				handleClick(event)
			}
			sx={{
				position: 'relative',
				overflow: 'hidden',
				backgroundColor: palette.components.edit.reactFlow.tableHeader.default,
			}}
		>
			<Add
				fontSize="small"
				sx={{
					fontSize: '0.85rem',
				}}
			/>

			<Box
				position="absolute"
				display={table.isEditing ? 'none' : 'block'}
				sx={{
					width: '100%',
					height: '100%',
					bgcolor: hexToRgba({
						hex: palette.components.edit.reactFlow.lockBg,
						alpha: 0.3,
					}),
				}}
			/>
		</IconButton>
	);
};
