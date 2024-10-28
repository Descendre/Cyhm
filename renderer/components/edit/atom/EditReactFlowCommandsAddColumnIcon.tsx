import { IconButton } from '@mui/material';
import { useLayout } from '../../../hooks';
import { Add } from '@mui/icons-material';
import { EditReactFlowCommandsAddColumnIconProps } from '../../../interfaces';

export const EditReactFlowCommandsAddColumnIcon = ({
	table,
}: EditReactFlowCommandsAddColumnIconProps) => {
	const { setAddColumnIndex, setSelectedTable, setIsEditLeftBar } = useLayout();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		setIsEditLeftBar(true);
		setSelectedTable(table);
		setAddColumnIndex(table.id);
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
				backgroundColor: table.color,
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
