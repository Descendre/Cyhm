'use client';
import {
	Avatar,
	AvatarGroup,
	IconButton,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { usePalette } from '../../../hooks';
import { MoreVert } from '@mui/icons-material';
import { hexToRgba } from '../../../utils';

export const TopProjectTableRow = () => {
	const palette = usePalette();

	return (
		<TableRow
			sx={{
				cursor: 'pointer',
				border: `solid 1px transparent`,
				'&:hover': {
					backgroundColor: hexToRgba({
						hex: palette.primary.main,
						alpha: 0.15,
					}),
				},
			}}
		>
			<TableCell
				size="small"
				sx={{
					width: '40%',
				}}
			>
				<Typography color={palette.text.secondary} noWrap fontSize="0.8rem">
					プロジェクト名aaaaaaaあああああああああああああああああああああ
				</Typography>
			</TableCell>
			<TableCell
				sx={{
					width: '25%',
				}}
			>
				<AvatarGroup
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Avatar
						sx={{
							width: 25,
							height: 25,
						}}
					/>
					<Avatar
						sx={{
							width: 25,
							height: 25,
						}}
					/>
					<Avatar
						sx={{
							width: 25,
							height: 25,
						}}
					/>
					<Avatar
						sx={{
							width: 25,
							height: 25,
						}}
					/>
				</AvatarGroup>
			</TableCell>
			<TableCell
				sx={{
					width: '25%',
				}}
			>
				<Typography
					color={palette.text.secondary}
					noWrap
					fontSize="0.8rem"
					textAlign="center"
				>
					XX日前
				</Typography>
			</TableCell>
			<TableCell
				sx={{
					width: '10%',
				}}
			>
				<Typography color={palette.text.secondary} noWrap fontSize="0.8rem">
					<IconButton size="small" disableTouchRipple>
						<MoreVert
							fontSize="small"
							sx={{
								color: palette.text.secondary,
							}}
						/>
					</IconButton>
				</Typography>
			</TableCell>
		</TableRow>
	);
};
