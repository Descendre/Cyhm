import { Avatar, Box, Typography } from '@mui/material';
import { usePalette, useProject } from '../../../hooks';
import { Settings } from '@mui/icons-material';

export const EditHeaderProjectTitle = () => {
	const palette = usePalette();
	const { currentProject } = useProject();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
		>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				gap="10px"
				width="90%"
				height="100%"
			>
				{currentProject?.dbType === 'SQLITE' ? (
					<Avatar
						title="sqlite"
						variant="square"
						src="/sqlite.png"
						sx={{
							width: '20px',
							height: '20px',
						}}
					/>
				) : currentProject?.dbType === 'SUPABASE' ? (
					<Avatar
						title="supabase"
						variant="square"
						src="/supabase.svg"
						sx={{
							width: '20px',
							height: '20px',
						}}
					/>
				) : (
					<></>
				)}
				<Typography
					variant="body2"
					sx={{ fontSize: '0.8rem' }}
					color={palette.text.disabled}
					noWrap
				>
					{currentProject?.name}
				</Typography>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				width="10%"
				height="100%"
			>
				<Settings
					titleAccess="設定"
					className="settingsIcon"
					fontSize="small"
					sx={{
						opacity: 0,
						color: palette.text.disabled,
					}}
				/>
			</Box>
		</Box>
	);
};
