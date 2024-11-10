import { Select } from '@mui/material';
import { usePalette } from '../../../hooks';

export const EditColumnConstraintPrimaryKeySelect = () => {
	const palette = usePalette();

	return (
		<Select
			variant="outlined"
			size="small"
			// value={column.type}
			// onChange={handleTypeChange}
			sx={{
				width: '70%',
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
			{/* {types.map((type) => (
            <MenuItem key={type} value={type}>
                <ColumnTypeTexts type={type} />
            </MenuItem>
        ))} */}
		</Select>
	);
};
