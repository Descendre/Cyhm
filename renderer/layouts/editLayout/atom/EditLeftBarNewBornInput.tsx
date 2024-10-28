import React, { useEffect, useRef } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { EditLeftBarNewBornInputProps } from '../../../interfaces';
import { useLayout } from '../../../hooks';

export const EditLeftBarNewBornInput = (
	props: EditLeftBarNewBornInputProps
) => {
	const {
		setIsTableAddMode,
		handleAddTable,
		handleAddColumn,
		setAddColumnIndex,
	} = useLayout();
	const placeholder =
		props.mode === 'table' ? 'テーブル名を入力' : 'カラム名を入力';
	const focusRef = useRef<HTMLInputElement | null>(null);

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	): void => {
		if (
			event.key === 'Enter' &&
			focusRef.current &&
			focusRef.current.value.length > 0
		) {
			if (props.mode === 'table') {
				handleAddTable({ tableName: focusRef.current.value });
			} else if (props.mode === 'column') {
				handleAddColumn({
					tableId: props.tableId,
					columnName: focusRef.current.value,
				});
			}
		}
	};

	const handleMouseDown = (event: React.MouseEvent): void => {
		event.preventDefault();
		if (focusRef.current && focusRef.current.value.length > 0) {
			if (props.mode === 'table') {
				handleAddTable({ tableName: focusRef.current.value });
			} else if (props.mode === 'column') {
				handleAddColumn({
					tableId: props.tableId,
					columnName: focusRef.current.value,
				});
			}
		}
	};

	const handleOnBlur = (): void => {
		if (props.mode === 'table') {
			setIsTableAddMode(false);
		} else if (props.mode === 'column') {
			setAddColumnIndex(null);
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
			onBlur={handleOnBlur}
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
							onMouseDown={handleMouseDown}
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