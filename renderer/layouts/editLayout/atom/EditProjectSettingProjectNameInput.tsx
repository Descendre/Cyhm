import { InputAdornment, TextField } from '@mui/material';
import { usePalette, useProject } from '../../../hooks';
import { Clear } from '@mui/icons-material';

export const EditProjectSettingProjectNameInput = () => {
	const palette = usePalette();
	const {
		currentProject,
		projectSettingInfo,
		setProjectSettingInfo,
		handleChangeProjectName,
	} = useProject();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (currentProject) {
			setProjectSettingInfo({
				...currentProject,
				projectName: event.target.value,
			});
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	): void => {
		if (
			event.key === 'Enter' &&
			currentProject &&
			currentProject.name !== projectSettingInfo.projectName &&
			projectSettingInfo.projectName
		) {
			handleChangeProjectName({ name: projectSettingInfo.projectName });
		}
	};

	return (
		<TextField
			fullWidth
			variant="outlined"
			size="small"
			placeholder="プロジェクト名を入力"
			value={projectSettingInfo?.projectName || ''}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			sx={{
				flexGrow: 1,
				height: '30px',
				borderRadius: '4px',
				backgroundColor: palette.layout.editLayout.header.searchBar.bg,
				'& .MuiInputBase-root': {
					height: '30px',
					'&:hover fieldset': {
						border: `solid 1px ${palette.text.disabled}`,
					},
					'&.Mui-focused fieldset': {
						border: `1px solid ${palette.primary.main}`,
					},
					'&.Mui-disabled fieldset': {
						border: 'none',
					},
				},
			}}
			inputProps={{
				style: {
					fontSize: '0.7rem',
				},
			}}
			InputProps={{
				endAdornment: (
					<>
						{currentProject?.name !== projectSettingInfo.projectName ? (
							<InputAdornment position="end">
								<Clear
									titleAccess="元に戻す"
									fontSize="small"
									sx={{
										color: palette.primary.main,
										cursor: 'pointer',
									}}
									onClick={() =>
										setProjectSettingInfo((prev) => ({
											...prev,
											projectName: currentProject.name,
										}))
									}
								/>
							</InputAdornment>
						) : (
							<></>
						)}
					</>
				),
			}}
		/>
	);
};
