import { Box } from '@mui/material';
import { EditRightPopperColumnSettingAreaProps } from '../../../interfaces';
import { useLayout, usePalette } from '../../../hooks';
import { Tune, ViewColumn } from '@mui/icons-material';
import {
	EditRightPopperColumnNameInput,
	EditRightPopperColumnTypeSelect,
} from '../atom';

export const EditRightPopperColumnSettingArea = ({
	table,
}: EditRightPopperColumnSettingAreaProps) => {
	const palette = usePalette();
	const { columns } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			gap="50px"
			width="100%"
			padding="20px 0"
		>
			{columns?.[table?.id]?.map((column) => (
				<Box
					key={column.id}
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
					gap="10px"
					width="100%"
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="10px"
						width="100%"
					>
						<ViewColumn
							titleAccess="カラム名を変更"
							fontSize="small"
							sx={{
								color: palette.text.disabled,
								fontSize: '1.1rem',
								cursor: 'pointer',
							}}
						/>
						<EditRightPopperColumnNameInput column={column} table={table} />
					</Box>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						gap="10px"
						width="100%"
					>
						<Tune
							titleAccess="タイプを選択"
							fontSize="small"
							sx={{
								color: palette.text.disabled,
								fontSize: '1.1rem',
								cursor: 'pointer',
							}}
						/>
						<EditRightPopperColumnTypeSelect column={column} table={table} />
					</Box>
				</Box>
			))}
		</Box>
	);
};
