'use client';
import { Popper } from '@mui/material';
import { Sketch } from '@uiw/react-color';
import { EditRightPopperSketchPickerProps } from '../../../interfaces';
import { useEffect, useRef } from 'react';
import { usePalette, useProject } from '../../../hooks';

export const EditRightPopperSketchPicker = ({
	open,
	anchorEl,
	onClose,
	parentRef,
	table,
}: EditRightPopperSketchPickerProps) => {
	const popperRef = useRef<HTMLDivElement | null>(null);
	const palette = usePalette();
	const { tableEditInfo, handleTableColorChange } = useProject();

	const handleColorChange = (color: string) => {
		const tableId = table?.id;
		if (!tableId) return;
		handleTableColorChange({ tableId: tableId, color: color });
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popperRef.current &&
				parentRef.current &&
				!popperRef.current.contains(event.target as Node) &&
				!parentRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	return (
		<Popper
			ref={popperRef}
			open={open}
			anchorEl={anchorEl}
			placement="left-end"
			modifiers={[
				{
					name: 'offset',
					options: {
						offset: [0, 10],
					},
				},
			]}
		>
			<Sketch
				disableAlpha
				color={tableEditInfo[table?.id]?.color || ''}
				onChange={(color) => handleColorChange(color.hex.substring(1))}
				style={{
					backgroundColor: palette.layout.editLayout.rightPopper.bg,
					borderRadius: '5px 0 0 5px',
				}}
			/>
		</Popper>
	);
};
