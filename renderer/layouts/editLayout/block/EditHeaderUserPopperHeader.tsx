import { Close, SwitchLeft, SwitchRight } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { EditHeaderUserPopperHeaderProps } from '../../../interfaces';
import { usePalette } from '../../../hooks';
import { EditHeaderUserPopperSearchBar } from '../atom';

export const EditHeaderUserPopperHeader = ({
	setAnchorEl,
	isUserView,
	setIsUserView,
}: EditHeaderUserPopperHeaderProps) => {
	const palette = usePalette();

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="35px"
				padding="5px 10px"
			>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					gap="5px"
					flexGrow={1}
					maxWidth="90%"
					height="100%"
					onClick={() => setIsUserView((prev) => !prev)}
					sx={{
						cursor: 'pointer',
						'&: hover .title': {
							textDecoration: 'underline',
						},
					}}
				>
					{isUserView ? (
						<SwitchLeft
							fontSize="small"
							sx={{
								color: palette.text.secondary,
								fontSize: '1.2rem',
								pointerEvents: 'none',
							}}
						/>
					) : (
						<SwitchRight
							fontSize="small"
							sx={{
								color: palette.text.secondary,
								fontSize: '1.2rem',
								pointerEvents: 'none',
							}}
						/>
					)}
					<Typography
						noWrap
						className="title"
						variant="body2"
						fontSize="0.8rem"
						color="text.secondary"
						sx={{
							userSelect: 'none',
						}}
					>
						{isUserView ? 'メンバー設定' : 'メンバーを追加'}
					</Typography>
				</Box>
				<Close
					titleAccess="閉じる"
					color="error"
					fontSize="small"
					sx={{
						fontSize: '1.2rem',
						cursor: 'pointer',
					}}
					onClick={() => setAnchorEl(null)}
				/>
			</Box>
			<Divider
				sx={{
					width: '100%',
				}}
			/>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				height="50px"
				padding="5px 10px"
			>
				<EditHeaderUserPopperSearchBar isUserView={isUserView} />
			</Box>
		</>
	);
};
