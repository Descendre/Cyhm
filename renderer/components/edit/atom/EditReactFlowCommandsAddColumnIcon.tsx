import { IconButton } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { Add } from '@mui/icons-material';
import { EditReactFlowCommandsAddColumnIconProps } from '../../../interfaces';

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
			disableRipple
			onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
				handleClick(event)
			}
			sx={{
				backgroundColor: palette.components.edit.reactFlow.tableHeader.default,
			}}
		>
			<Add
				fontSize="small"
				sx={{
					fontSize: '0.85rem',
				}}
			/>
		</IconButton>
	);
};
