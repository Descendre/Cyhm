import React, { useEffect, useRef } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { EditLeftBarNewBornInputProps } from '../../../interfaces';
import { useLayout } from '../../../hooks';

export const EditLeftBarNewBornInput = ({
	mode,
}: EditLeftBarNewBornInputProps) => {
	const { setIsTableAddMode, handleAddTable } = useLayout();
	const placeholder = mode === 'table' ? 'テーブル名を入力' : 'カラム名を入力';
	const focusRef = useRef<HTMLInputElement | null>(null);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && focusRef.current) {
			handleAddTable({ tableName: focusRef.current.value });
		}
	};

	useEffect(() => {
		if (focusRef.current) {
			focusRef.current.focus();
		}
	}, []);

	return (
		<TextField
			fullWidth
			size="small"
			inputRef={focusRef}
			placeholder={placeholder}
			onKeyDown={handleKeyDown}
			onBlur={() => setIsTableAddMode(false)}
			sx={{
				flexGrow: 1,
				height: '100%',
				borderRadius: '4px',
				'& .MuiInputBase-root': {
					fontSize: '0.75rem',
					height: '100%',
					'& fieldset': {
						border: 'none',
					},
					'&:hover fieldset': {
						border: 'none',
					},
					'&.Mui-focused fieldset': {
						border: 'none',
					},
				},
			}}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Add
							color="primary"
							fontSize="small"
							onMouseDown={() =>
								handleAddTable({ tableName: focusRef.current.value })
							}
							sx={{
								cursor: 'pointer',
							}}
						/>
					</InputAdornment>
				),
			}}
		/>
	);
};
