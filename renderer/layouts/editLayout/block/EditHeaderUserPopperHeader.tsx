import { Close, PeopleAlt, PersonAdd, PersonSearch } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { EditHeaderUserPopperHeaderProps } from '../../../interfaces';
import { useLayout, usePalette } from '../../../hooks';
import { EditHeaderUserPopperSearchBar } from '../atom';

export const EditHeaderUserPopperHeader = ({
	setAnchorEl,
}: EditHeaderUserPopperHeaderProps) => {
	const palette = usePalette();
	const { userPopperViewMode, handleSwitchUserPopperViewMode } = useLayout();

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
					onClick={() => handleSwitchUserPopperViewMode()}
					sx={{
						cursor: 'pointer',
					}}
				>
					{userPopperViewMode === 'member' ? (
						<PeopleAlt
							fontSize="small"
							sx={{
								color: palette.text.secondary,
								fontSize: '1.2rem',
								pointerEvents: 'none',
							}}
						/>
					) : userPopperViewMode === 'invite' ? (
						<PersonSearch
							fontSize="small"
							sx={{
								color: palette.text.secondary,
								fontSize: '1.2rem',
								pointerEvents: 'none',
							}}
						/>
					) : (
						<PersonAdd
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
						variant="body2"
						fontSize="0.8rem"
						color="text.secondary"
						sx={{
							userSelect: 'none',
						}}
					>
						{userPopperViewMode === 'member'
							? 'メンバー設定'
							: userPopperViewMode === 'invite'
								? 'メンバーを追加'
								: '招待済みユーザー'}
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
				<EditHeaderUserPopperSearchBar />
			</Box>
		</>
	);
};
