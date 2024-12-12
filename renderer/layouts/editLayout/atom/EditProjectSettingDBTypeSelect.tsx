import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { DBType } from '@prisma/client';

export const EditProjectSettingDBTypeSelect = () => {
	const palette = usePalette();
	const { handleGetDBTypeText } = useLayout();
	const { currentProject, projectSettingInfo, setProjectSettingInfo } =
		useProject();
	const dbTypes: DBType[] = ['SQLITE', 'SUPABASE'];

	const handleTypeChange = async (event: SelectChangeEvent) => {
		if (!currentProject) return;
		const newType = event.target.value as DBType;
		setProjectSettingInfo((prev) => ({
			...prev,
			dbType: newType,
		}));
	};

	return (
		<Select
			variant="outlined"
			size="small"
			value={projectSettingInfo?.dbType}
			onChange={handleTypeChange}
			sx={{
				width: '50%',
				height: '30px',
				borderRadius: '4px',
				backgroundColor: palette.layout.editLayout.header.searchBar.bg,
				'& .MuiSelect-select': {
					height: '30px',
					display: 'flex',
					alignItems: 'center',
				},
				'& .MuiSelect-icon': {
					color: palette.text.secondary,
				},
				'&:hover .MuiOutlinedInput-notchedOutline': {
					border: `1px solid ${palette.text.disabled}`,
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					border: `1px solid ${palette.primary.main}`,
				},
				'&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
					border: 'none',
				},
			}}
			inputProps={{
				style: {
					fontSize: '0.7rem',
				},
			}}
		>
			{dbTypes.map((type) => (
				<MenuItem key={type} value={type}>
					{handleGetDBTypeText(type, true, '20px', '0.8rem')}
				</MenuItem>
			))}
		</Select>
	);
};
