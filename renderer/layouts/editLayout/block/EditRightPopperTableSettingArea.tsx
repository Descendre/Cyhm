import { Box } from '@mui/material';
import {
	EditRightPopperSketchPicker,
	EditRightPopperTableColorInput,
	EditRightPopperTableModeSelect,
	EditRightPopperTableNameInput,
} from '../atom';
import { Circle, DriveFileRenameOutline } from '@mui/icons-material';
import { usePalette } from '../../../hooks';
import { EditRightPopperTableSettingAreaProps } from '../../../interfaces';
import { useRef, useState } from 'react';

export const EditRightPopperTableSettingArea = ({
	table,
}: EditRightPopperTableSettingAreaProps) => {
	const palette = usePalette();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const boxRef = useRef<HTMLElement | null>(null);

	const handleCircleClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopperClose = (): void => {
		setAnchorEl(null);
	};

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
					<EditRightPopperTableNameInput />
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="10px"
					width="100%"
					onClick={handleCircleClick}
					ref={boxRef}
				>
					<Circle
						titleAccess="テーブルカラーを変更"
						fontSize="small"
						sx={{
							color: table
								? table.color
								: palette.components.edit.reactFlow.tableHeader.default,
							fontSize: '1.1rem',
							cursor: 'pointer',
						}}
					/>
					<EditRightPopperTableColorInput />
				</Box>
				<EditRightPopperTableModeSelect table={table} />
			</Box>

			<EditRightPopperSketchPicker
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handlePopperClose}
				parentRef={boxRef}
			/>
		</>
	);
};
