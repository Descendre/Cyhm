import { Box, Button, Divider, Typography } from '@mui/material';
import { EditColumnConstraintSettingHeaderProps } from '../../../interfaces';
import { Add, Remove } from '@mui/icons-material';
import { useLayout, useProject } from '../../../hooks';

export const EditColumnConstraintSettingHeader = ({
	column,
}: EditColumnConstraintSettingHeaderProps) => {
	const {
		handleGetColumnTypeTextWithSQlite,
		handleGetColumnTypeTextWithSupabase,
		handleSelectColumnConstraintItem,
	} = useLayout();
	const { currentProject, columnConstraintEditInfo } = useProject();

	return (
		<Box width="100%">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="40px"
			>
				{currentProject.dbType === 'SQLITE' ? (
					handleGetColumnTypeTextWithSQlite(
						column.sqliteType,
						false,
						'1rem',
						'0.6rem'
					)
				) : currentProject.dbType == 'SUPABASE' ? (
					handleGetColumnTypeTextWithSupabase(
						column.supabaseType,
						false,
						'1rem',
						'0.6rem'
					)
				) : (
					<></>
				)}
				<Typography flexGrow={1} variant="body1" marginLeft="5px" noWrap>
					{column?.name}
				</Typography>
				<Button
					size="small"
					disableTouchRipple
					onClick={() =>
						handleSelectColumnConstraintItem({ columnId: column.id })
					}
					sx={{
						height: '30px',
						padding: '0 10px',
					}}
					endIcon={
						columnConstraintEditInfo?.columnId === column.id ? (
							<Remove />
						) : (
							<Add />
						)
					}
				>
					<Typography variant="body2" fontSize="0.7rem">
						{columnConstraintEditInfo?.columnId === column.id
							? '追加モードを離脱'
							: '制約を追加'}
					</Typography>
				</Button>
			</Box>
			<Divider
				sx={{
					width: '100%',
				}}
			/>
		</Box>
	);
};
