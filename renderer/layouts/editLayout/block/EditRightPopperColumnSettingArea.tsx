import { Box, Divider } from '@mui/material';
import { EditRightPopperColumnSettingAreaProps } from '../../../interfaces';
import { useLayout, usePalette } from '../../../hooks';
import { Rule, Tune, ViewColumn } from '@mui/icons-material';
import {
	EditRightPopperAddColumnConstraintButton,
	EditRightPopperColumnHeader,
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
			gap="20px"
			width="100%"
			padding="20px 0"
		>
			{columns?.[table?.id]?.map((column) => (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
					gap="20px"
					width="100%"
					key={column.id}
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						gap="15px"
						width="100%"
					>
						<EditRightPopperColumnHeader table={table} />
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
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							gap="10px"
							width="100%"
						>
							<Rule
								titleAccess="制約を追加"
								fontSize="small"
								sx={{
									color: palette.text.disabled,
									fontSize: '1.1rem',
									cursor: 'pointer',
								}}
							/>
							<EditRightPopperAddColumnConstraintButton table={table} />
						</Box>
					</Box>
					<Divider
						sx={{
							width: '100%',
							margin: '0 auto',
						}}
					/>
				</Box>
			))}
		</Box>
	);
};
