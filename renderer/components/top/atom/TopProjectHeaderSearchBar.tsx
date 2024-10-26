'use client';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { usePalette } from '../../../hooks';
import { Search } from '@mui/icons-material';

export const TopProjectHeaderSearchBar = () => {
	const palette = usePalette();

	return (
		<>
			<TextField
				variant="outlined"
				size="small"
				placeholder="プロジェクト名で検索"
				sx={{
					width: '75%',
					borderRadius: '4px',
					backgroundColor: '#000',
					'& .MuiInputBase-root': {
						'&:hover fieldset': {
							border: `solid 1px ${palette.text.disabled}`,
						},
						'&.Mui-focused fieldset': {
							border: `1px solid ${palette.primary.main}`,
						},
					},
				}}
				inputProps={{
					style: {
						fontSize: '0.8rem',
					},
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search
								fontSize="small"
								sx={{
									color: palette.text.disabled,
								}}
							/>
						</InputAdornment>
					),
				}}
			/>
		</>
	);
};
