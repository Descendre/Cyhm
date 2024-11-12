import { Box } from '@mui/material';
import { usePalette, useProject } from '../../../hooks';
import {
	EditColumnConstraintSqliteAddingTypeSelect,
	EditColumnConstraintSqlitePrimaryKeyAddingClauseSelect,
} from '../atom';
import { EditColumnConstraintSqliteAddingAreaProps } from '../../../interfaces';
import { Add } from '@mui/icons-material';

export const EditColumnConstraintSqliteAddingArea = ({
	column,
}: EditColumnConstraintSqliteAddingAreaProps) => {
	const palette = usePalette();
	const { currentProject, columnConstraintEditInfo, handleAddConstraint } =
		useProject();

	const isAddIconDisplay: boolean = [
		'PRIMARY_KEY',
		'NOT_NULL',
		'UNIQUE',
	].includes(columnConstraintEditInfo.columnConstraintType);

	return (
		<>
			<Box
				position="relative"
				display="flex"
				justifyContent="center"
				alignItems="center"
				width="100%"
				height="100px"
				padding="0 15px"
				bgcolor={palette.layout.editLayout.columnConstraint.constRaintArea.bg}
				border={`solid 1px ${palette.primary.main}`}
				borderRadius="10px"
			>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					width="45%"
					height="100%"
				>
					<EditColumnConstraintSqliteAddingTypeSelect column={column} />
				</Box>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					width="45%"
					height="100%"
				>
					{columnConstraintEditInfo?.columnConstraintType === 'PRIMARY_KEY' && (
						<EditColumnConstraintSqlitePrimaryKeyAddingClauseSelect
							column={column}
						/>
					)}
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="10%"
					height="100%"
				>
					<Add
						titleAccess="制約を追加"
						fontSize="small"
						color="primary"
						onClick={() =>
							handleAddConstraint({
								columnId: column.id,
								type: columnConstraintEditInfo.columnConstraintType,
								dbType: currentProject.dbType,
								sqliteClauseType: columnConstraintEditInfo.clauseType,
							})
						}
						sx={{
							display: isAddIconDisplay ? 'block' : 'none',
							cursor: 'pointer',
						}}
					/>
				</Box>
			</Box>
		</>
	);
};
