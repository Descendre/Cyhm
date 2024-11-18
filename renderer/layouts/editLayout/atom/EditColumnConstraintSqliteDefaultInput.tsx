import { TextField } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import {
	EditColumnConstraintSqliteDefaultInputProps,
	validateDefaultConstraintSqliteReturn,
} from '../../../interfaces';
import { ChangeEvent } from 'react';

export const EditColumnConstraintSqliteDefaultInput = ({
	column,
}: EditColumnConstraintSqliteDefaultInputProps) => {
	const { columnConstraintEditInfo, setColumnConstraintEditInfo } =
		useProject();
	const { handleDebouncedDefaultConstraintValidationIPC } = useLayout();
	const palette = usePalette();

	const handleChange = async (
		event: ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		setColumnConstraintEditInfo((prev) => ({
			...prev,
			columnId: column.id,
			value: event.target.value as string | null,
		}));
		const validationResult: validateDefaultConstraintSqliteReturn | null =
			await handleDebouncedDefaultConstraintValidationIPC({
				column: column,
				value: event.target.value,
			});
		if (!validationResult) return;
	};

	const isError: boolean = Boolean(
		columnConstraintEditInfo.errorText && columnConstraintEditInfo.value
	);

	return (
		<>
			<TextField
				variant="outlined"
				size="small"
				error={isError}
				helperText={isError ? columnConstraintEditInfo.errorText : ''}
				value={columnConstraintEditInfo?.value || ''}
				onChange={handleChange}
				sx={{
					width: '80%',
					height: '30px',
					borderRadius: '4px',
					backgroundColor: palette.layout.editLayout.header.searchBar.bg,
					'& .MuiInputBase-root': {
						height: '30px',
						'&:hover fieldset': {
							border: `solid 1px ${isError ? palette.error.main : palette.text.disabled}`,
						},
						'&.Mui-focused fieldset': {
							border: `1px solid ${isError ? palette.error.main : palette.primary.main}`,
						},
						'&.Mui-disabled fieldset': {
							border: 'none',
						},
					},
					'& .MuiFormHelperText-root': {
						fontSize: '0.7rem',
						lineHeight: 1.1,
					},
				}}
				inputProps={{
					style: {
						fontSize: '0.7rem',
					},
				}}
			/>
		</>
	);
};
