import { Box, Typography } from '@mui/material';
import {
	EditProjectSettingDBTypeSelect,
	EditProjectSettingProjectNameInput,
} from '../atom';
import { useProject } from '../../../hooks';
import { LoadingButton } from '@mui/lab';

export const EditProjectSettingBasicSettingArea = () => {
	const {
		currentProject,
		projectSettingInfo,
		projectSettingChanging,
		handleChangeProjectName,
		handleChangeProjectDBType,
	} = useProject();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			gap="30px"
			width="100%"
			padding="30px 10px"
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				width="100%"
				height="50px"
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="40%"
					height="100%"
				>
					<Typography
						variant="body2"
						color="text.secondary"
						width="100%"
						noWrap
						fontSize="0.8rem"
					>
						プロジェクト名:
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="10px"
					width="60%"
					height="100%"
				>
					<EditProjectSettingProjectNameInput />
					<LoadingButton
						loading={projectSettingChanging === 'name'}
						color="primary"
						size="small"
						variant="contained"
						disableTouchRipple
						disabled={
							currentProject?.name === projectSettingInfo.projectName ||
							!projectSettingInfo.projectName
						}
						sx={{
							height: '30px',
						}}
						onClick={() =>
							handleChangeProjectName({ name: projectSettingInfo.projectName })
						}
					>
						保存
					</LoadingButton>
				</Box>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				width="100%"
				height="50px"
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="40%"
					height="100%"
				>
					<Typography
						variant="body2"
						color="text.secondary"
						width="100%"
						noWrap
						fontSize="0.8rem"
					>
						データベースのタイプ:
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="end"
					alignItems="center"
					gap="10px"
					width="60%"
					height="100%"
				>
					<EditProjectSettingDBTypeSelect />
					<LoadingButton
						loading={projectSettingChanging === 'dbType'}
						color="primary"
						size="small"
						variant="contained"
						disableTouchRipple
						disabled={
							currentProject?.dbType === projectSettingInfo.dbType ||
							!projectSettingInfo.dbType
						}
						sx={{
							height: '30px',
						}}
						onClick={() =>
							handleChangeProjectDBType({ type: projectSettingInfo.dbType })
						}
					>
						保存
					</LoadingButton>
				</Box>
			</Box>
		</Box>
	);
};
