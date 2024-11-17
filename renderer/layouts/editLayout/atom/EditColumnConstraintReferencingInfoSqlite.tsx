import React from 'react';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { EditColumnConstraintReferencingInfoSqliteProps } from '../../../interfaces';
import { Box, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

export const EditColumnConstraintReferencingInfoSqlite = ({
	constraint,
}: EditColumnConstraintReferencingInfoSqliteProps) => {
	const {
		setConstraintEditingTableId,
		handleGetReferencingPrimaryKeyInfoSqlite,
	} = useLayout();
	const { setAddConstraintColumnId } = useProject();
	const palette = usePalette();

	const referencedInfo = handleGetReferencingPrimaryKeyInfoSqlite(constraint);

	const handleClick = (): void => {
		if (!referencedInfo || !referencedInfo.tableId || !referencedInfo.columnId)
			return;
		setConstraintEditingTableId(referencedInfo.tableId);
		setAddConstraintColumnId(referencedInfo.columnId);
	};

	return (
		<>
			{referencedInfo && (
				<Box
					title="参照中のカラム"
					display="flex"
					justifyContent="start"
					alignItems="center"
					gap="3px"
					maxWidth="100%"
					onClick={handleClick}
					sx={{
						cursor: 'pointer',
					}}
				>
					<Logout
						fontSize="small"
						sx={{
							fontSize: '1rem',
							color: palette.text.secondary,
						}}
					/>
					<Typography
						variant="body2"
						fontSize="0.7rem"
						noWrap
						color="text.secondary"
					>
						{referencedInfo.columnName}
					</Typography>
				</Box>
			)}
		</>
	);
};
