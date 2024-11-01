'use client';
import { Popper } from '@mui/material';
import { Sketch } from '@uiw/react-color';
import { EditRightPopperSketchPickerProps } from '../../../interfaces';
import { usePalette, useProject } from '../../../hooks';

export const EditRightPopperSketchPicker = ({
	open,
	anchorEl,
	popperRef,
	table,
}: EditRightPopperSketchPickerProps) => {
	const palette = usePalette();
	const { tableEditInfo, handleTableColorChange } = useProject();

	const handleColorChange = (color: string) => {
		const tableId = table?.id;
		if (!tableId) return;
		handleTableColorChange({ tableId: tableId, color: color });
	};

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
