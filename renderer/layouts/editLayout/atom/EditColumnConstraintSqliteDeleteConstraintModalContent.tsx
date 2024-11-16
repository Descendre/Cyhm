import { Box, Divider, Typography } from '@mui/material';
import { EditColumnConstraintSqliteDeleteConstraintModalContentProps } from '../../../interfaces';
import { useLayout, usePalette } from '../../../hooks';
import { Circle } from '@mui/icons-material';

export const EditColumnConstraintSqliteDeleteConstraintModalContent = ({
	column,
	constraint,
}: EditColumnConstraintSqliteDeleteConstraintModalContentProps) => {
	const palette = usePalette();
	const { tables, columns, handleGetColumnTypeTextWithSQlite } = useLayout();

	// 渡された制約が主キーの場合その主キーを参照中の外部キー制約のIDを配列取得
	const referencingForeignKeyIds: string[] =
		constraint.type === 'PRIMARY_KEY'
			? constraint.toReferences.map((reference) => reference.foreignKeyId)
			: [];

	// 外部キーIDに関連するカラムとテーブル情報を取得
	const referencingInfos = Object.values(columns).flatMap((columnArray) =>
		columnArray
			.filter((column) =>
				column.columnConstraints.some((constraint) =>
					constraint.fromReferences.some(
						(reference) =>
							referencingForeignKeyIds.includes(reference.foreignKeyId) // 外部キーIDが参照リストに含まれているかをチェック
					)
				)
			)
			.map((column) => {
				const tableId = column.tableId;
				const tableName = tables[tableId]?.name;
				const tableColor = tables[tableId]?.color;
				return {
					tableColor: tableColor,
					tableName: tableName,
					sqliteType: column.sqliteType,
					columnName: column.name,
				};
			})
	);

	const sortedReferencingInfos = referencingInfos.sort((a, b) =>
		a.columnName.localeCompare(b.columnName)
	);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="start"
			flexDirection="column"
			gap="30px"
			width="100%"
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
							{`※関連する外部キー制約(${sortedReferencingInfos.length}件)が削除されます。`}
						</Typography>
						{sortedReferencingInfos.map((reference, index) => (
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
								<Divider
									sx={{
										width: '100%',
									}}
								/>
							</Box>
						))}
					</Box>
				)}
			</>
		</Box>
	);
};
