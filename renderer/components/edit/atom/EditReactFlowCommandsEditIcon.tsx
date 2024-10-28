import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { EditReactFlowCommandsEditIconProps } from '../../../interfaces';

export const EditReactFlowCommandsEditIcon = ({
	table,
}: EditReactFlowCommandsEditIconProps) => {
	const { handleTableEditMode } = useLayout();
	const palette = usePalette();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		handleTableEditMode(table.id);
	};

	return (
		<IconButton
			size="small"
			title="メニューを表示"
			disableRipple
			onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
				handleClick(event)
			}
			sx={{
				backgroundColor: table.isEditing ? palette.primary.main : table.color,
			}}
		>
			<Edit
				fontSize="small"
				sx={{
					fontSize: '0.85rem',
				}}
			/>
		</IconButton>
	);
};
