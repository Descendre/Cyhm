import { Box } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import {
	EditColumnConstraintSqliteAddingTypeSelect,
	EditColumnConstraintSqlitePrimaryKeyAddingClauseSelect,
} from '../atom';
import {
	EditColumnConstraintSqliteAddingAreaProps,
	handleAddConstraintProps,
	validateDefaultConstraintSqliteReturn,
} from '../../../interfaces';
import { Add } from '@mui/icons-material';
import { EditColumnConstraintSqliteForeignKeyAddingClauseSelect } from '../atom/EditColumnConstraintSqliteForeignKeyAddingClauseSelect';
import { EditColumnConstraintSqliteDefaultInput } from '../atom/EditColumnConstraintSqliteDefaultInput';

export const EditColumnConstraintSqliteAddingArea = ({
	column,
}: EditColumnConstraintSqliteAddingAreaProps) => {
	const palette = usePalette();
	const { handleDefaultConstraintValidationIPC } = useLayout();
	const { currentProject, columnConstraintEditInfo, handleAddConstraint } =
		useProject();

	const isForeignKeyWithPrimaryKey =
		columnConstraintEditInfo.columnConstraintType === 'FOREIGN_KEY' &&
		Boolean(columnConstraintEditInfo.primaryKeyId);

	const isDefaultKeyAndWithNoError =
		columnConstraintEditInfo.columnConstraintType === 'DEFAULT' &&
		Boolean(
			columnConstraintEditInfo.value && !columnConstraintEditInfo.errorText
		);

	const isAddIconDisplay: boolean =
		['PRIMARY_KEY', 'NOT_NULL', 'UNIQUE'].includes(
			columnConstraintEditInfo.columnConstraintType
		) ||
		isForeignKeyWithPrimaryKey ||
		isDefaultKeyAndWithNoError;

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
				bgcolor={palette.layout.editLayout.columnConstraint.constraintArea.bg}
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
					{columnConstraintEditInfo &&
						(columnConstraintEditInfo.columnConstraintType === 'PRIMARY_KEY' ? (
							<EditColumnConstraintSqlitePrimaryKeyAddingClauseSelect
								column={column}
							/>
						) : columnConstraintEditInfo.columnConstraintType ===
						  'FOREIGN_KEY' ? (
							<EditColumnConstraintSqliteForeignKeyAddingClauseSelect
								column={column}
							/>
						) : columnConstraintEditInfo.columnConstraintType === 'DEFAULT' ? (
							<EditColumnConstraintSqliteDefaultInput column={column} />
						) : (
							<></>
						))}
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
						onClick={async () => {
							if (columnConstraintEditInfo.columnConstraintType === 'DEFAULT') {
								const validationResult: validateDefaultConstraintSqliteReturn | null =
									await handleDefaultConstraintValidationIPC({
										column: column,
										value: columnConstraintEditInfo.value,
									});
								if (validationResult && validationResult.message) {
									return;
								}
							}
							await handleAddConstraint({
								columnId: column.id,
								type: columnConstraintEditInfo.columnConstraintType,
								dbType: currentProject.dbType,
								projectId: currentProject.id,
								value: columnConstraintEditInfo.value,
								sqliteClauseType: columnConstraintEditInfo.clauseType,
								primaryKeyId: columnConstraintEditInfo.primaryKeyId,
							} as handleAddConstraintProps);
						}}
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
