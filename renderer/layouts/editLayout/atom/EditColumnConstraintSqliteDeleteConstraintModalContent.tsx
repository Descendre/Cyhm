import { Box, Divider, Typography } from '@mui/material';
import { EditColumnConstraintSqliteDeleteConstraintModalContentProps } from '../../../interfaces';
import { useLayout, usePalette } from '../../../hooks';
import { Circle } from '@mui/icons-material';

export const EditColumnConstraintSqliteDeleteConstraintModalContent = ({
	column,
	constraint,
}: EditColumnConstraintSqliteDeleteConstraintModalContentProps) => {
	const palette = usePalette();
	const {
		handleGetColumnTypeTextWithSQlite,
		handleGetReferencingForeignKeyInfosSqlite,
	} = useLayout();

	const referencingInfos =
		handleGetReferencingForeignKeyInfosSqlite(constraint);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="start"
			flexDirection="column"
			gap="30px"
			width="100%"
			minHeight="100%"
		>
			<Typography
				width="100%"
				fontSize="0.8rem"
				sx={{
					wordBreak: 'break-all',
				}}
			>
				{column.name}カラムから
				<span style={{ color: palette.primary.main }}>{constraint.type}</span>
				制約を削除しようとしています。
			</Typography>

			<>
				{referencingInfos.length > 0 && (
					<Box width="100%" padding="0 0 15px 0">
						<Typography
							width="100%"
							fontSize="0.7rem"
							color="error"
							sx={{
								wordBreak: 'break-all',
								marginBottom: '10px',
							}}
						>
							{`※関連する外部キー制約(${referencingInfos.length}件)が削除されます。`}
						</Typography>
						{referencingInfos.map((reference, index) => (
							<Box key={index} width="100%">
								<Box
									display="flex"
									justifyContent="start"
									alignItems="start"
									width="100%"
									padding="5px 0"
								>
									<Box
										display="flex"
										justifyContent="start"
										alignItems="start"
										gap="3px"
										width="50%"
									>
										<Circle
											fontSize="small"
											sx={{
												fontSize: '0.8rem',
												color: reference.tableColor,
											}}
										/>
										<Typography
											fontSize="0.8rem"
											sx={{
												wordBreak: 'break-all',
											}}
										>
											{reference.tableName}
										</Typography>
									</Box>

									<Box
										display="flex"
										justifySelf="center"
										alignItems="start"
										gap="3px"
										width="50%"
									>
										{handleGetColumnTypeTextWithSQlite(
											reference.sqliteType,
											false,
											'',
											''
										)}
										<Typography
											fontSize="0.8rem"
											sx={{
												wordBreak: 'break-all',
												marginLeft: '3px',
											}}
										>
											{reference.columnName}
										</Typography>
									</Box>
								</Box>
								{referencingInfos.length >= 2 &&
									index < referencingInfos.length - 1 && (
										<Divider
											sx={{
												width: '100%',
											}}
										/>
									)}
							</Box>
						))}
					</Box>
				)}
			</>
		</Box>
	);
};
