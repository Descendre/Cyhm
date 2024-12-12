'use client';
import {
	Avatar,
	AvatarGroup,
	Box,
	IconButton,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { MoreVert } from '@mui/icons-material';
import { formatTimeAgo, hexToRgba } from '../../../utils';
import { TopProjectTableRowProps } from '../../../interfaces';

export const TopProjectTableRow = ({ project }: TopProjectTableRowProps) => {
	const palette = usePalette();
	const { handleGetDBTypeText } = useLayout();
	const { handleStartProject } = useProject();

	return (
		<TableRow
			onClick={() => handleStartProject({ project: project })}
			sx={{
				position: 'relative',
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
					overflow: 'visible',
				}}
			>
				<Typography color={palette.text.secondary} noWrap fontSize="0.8rem">
					{project.name}
				</Typography>
			</TableCell>
			<TableCell
				sx={{
					width: '25%',
				}}
			>
				<AvatarGroup
					max={5}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{project.members.map((member) => (
						<Avatar
							title={member.userName}
							key={member.userId}
							src={member.userImage}
							sx={{
								width: 25,
								height: 25,
							}}
						/>
					))}
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
					{formatTimeAgo(new Date(project.updatedAt))}
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

				<Box position="absolute" top={0} left={0}>
					{handleGetDBTypeText(project.dbType, false, '20px', '20px')}
				</Box>
			</TableCell>
		</TableRow>
	);
};
