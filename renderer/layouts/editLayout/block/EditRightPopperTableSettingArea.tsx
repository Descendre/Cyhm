import { Box } from '@mui/material';
import {
	EditRightPopperSketchPicker,
	EditRightPopperTableColorInput,
	EditRightPopperTableModeSelect,
	EditRightPopperTableNameInput,
} from '../atom';
import { Circle, DriveFileRenameOutline } from '@mui/icons-material';
import { useLayout, usePalette, usePopper, useProject } from '../../../hooks';
import { EditRightPopperTableSettingAreaProps } from '../../../interfaces';

export const EditRightPopperTableSettingArea = ({
	table,
}: EditRightPopperTableSettingAreaProps) => {
	const palette = usePalette();
	const { tables } = useLayout();
	const { tableEditInfo } = useProject();
	const { anchorEl, parentRef, popperRef, handleOpen } = usePopper<
		HTMLDivElement,
		HTMLDivElement
	>({});
	const isEditable: boolean = tables[table?.id]?.isEditing;

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				gap="10px"
				width="100%"
				padding="20px 0"
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="10px"
					width="100%"
				>
					<DriveFileRenameOutline
						titleAccess="テーブル名を変更"
						fontSize="small"
						sx={{
							color: palette.text.disabled,
							fontSize: '1.1rem',
							cursor: 'pointer',
						}}
					/>
					<EditRightPopperTableNameInput table={table} />
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="10px"
					width="100%"
					onClick={handleOpen}
					ref={parentRef}
				>
					<Circle
						titleAccess="テーブルカラーを変更"
						fontSize="small"
						sx={{
							color: '#' + tableEditInfo[table?.id]?.color || '',
							fontSize: '1.1rem',
							cursor: 'pointer',
						}}
					/>
					<EditRightPopperTableColorInput table={table} />
				</Box>
				<EditRightPopperTableModeSelect table={table} />
			</Box>

			<EditRightPopperSketchPicker
				open={Boolean(anchorEl) && isEditable}
				anchorEl={anchorEl}
				popperRef={popperRef}
				table={table}
			/>
		</>
	);
};
