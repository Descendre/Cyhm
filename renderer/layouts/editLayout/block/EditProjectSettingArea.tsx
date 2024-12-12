import { Box } from '@mui/material';
import { EditProjectSettingSection } from './EditProjectSettingSection';
import { Build, ErrorOutline, PeopleAlt } from '@mui/icons-material';
import { usePalette } from '../../../hooks';
import { EditProjectSettingBasicSettingArea } from './EditProjectSettingBasicSettingArea';

export const EditProjectSettingArea = () => {
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="100%"
			height="100%"
			padding="30px 0"
		>
			<EditProjectSettingSection
				title="基本設定"
				color="inherit"
				icon={
					<Build
						sx={{
							color: palette.text.primary,
							fontSize: '1rem',
						}}
						fontSize="small"
					/>
				}
			>
				<EditProjectSettingBasicSettingArea />
			</EditProjectSettingSection>
			<EditProjectSettingSection
				title="メンバー設定"
				color="inherit"
				icon={
					<PeopleAlt
						sx={{
							color: palette.text.primary,
							fontSize: '1rem',
						}}
						fontSize="small"
					/>
				}
			>
				<></>
			</EditProjectSettingSection>
			<EditProjectSettingSection
				title="危険な設定"
				color="error"
				icon={
					<ErrorOutline
						sx={{
							color: palette.error.main,
							fontSize: '1rem',
						}}
						fontSize="small"
					/>
				}
			>
				<></>
			</EditProjectSettingSection>
		</Box>
	);
};
