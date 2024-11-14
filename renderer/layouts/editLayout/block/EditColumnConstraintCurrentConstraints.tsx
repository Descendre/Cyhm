import { Box, Divider, Typography } from '@mui/material';
import { EditColumnConstraintCurrentConstraintsProps } from '../../../interfaces';
import { usePalette, useProject } from '../../../hooks';
import { EditColumnConstraintSqliteAddingArea } from './EditColumnConstraintSqliteAddingArea';
import { EditColumnConstraintColumnSqlite } from './EditColumnConstraintColumnSqlite';
import { EditColumnConstraintNoConstraintDisplay } from '../atom';

export const EditColumnConstraintCurrentConstraints = ({
	column,
}: EditColumnConstraintCurrentConstraintsProps) => {
	const palette = usePalette();
	const { currentProject, columnConstraintEditInfo } = useProject();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			gap="30px"
			width="100%"
		>
			{columnConstraintEditInfo?.columnId == column.id
				? currentProject.dbType === 'SQLITE' && (
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							flexDirection="column"
							gap="5px"
							width="100%"
						>
							<Typography
								variant="body2"
								noWrap
								width="100%"
								fontSize="0.7rem"
								color="text.secondary"
							>
								制約を追加
							</Typography>
							<EditColumnConstraintSqliteAddingArea column={column} />
						</Box>
					)
				: column.columnConstraints.length === 0 && (
						<EditColumnConstraintNoConstraintDisplay column={column} />
					)}

			{column.columnConstraints.length > 0 && (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
					gap="5px"
					width="100%"
				>
					<Typography
						variant="body2"
						noWrap
						width="100%"
						fontSize="0.7rem"
						color="text.secondary"
					>
						{`カラム制約一覧 (${column.columnConstraints.length}件)`}
					</Typography>
					<Box
						display={column.columnConstraints.length > 0 ? 'flex' : 'none'}
						justifyContent="start"
						alignItems="center"
						flexDirection="column"
						width="100%"
						padding="0 15px"
						bgcolor={
							palette.layout.editLayout.columnConstraint.constraintArea.bg
						}
						border={`solid 1px ${palette.line.constraintAreaBorder}`}
						borderRadius="10px"
					>
						{currentProject.dbType === 'SQLITE' ? (
							column.columnConstraints.map((constraint, index) => (
								<Box key={constraint.id} width="100%">
									<EditColumnConstraintColumnSqlite
										type={constraint.type}
										column={column}
										constraint={constraint}
									/>
									{column.columnConstraints.length - 1 > index && (
										<Divider
											sx={{
												width: '100%',
											}}
										/>
									)}
								</Box>
							))
						) : (
							<></>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
};
