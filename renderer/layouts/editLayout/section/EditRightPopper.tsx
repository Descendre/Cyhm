'use client';
import { Box } from '@mui/material';
import { useBreakPoint, useLayout, usePalette } from '../../../hooks';
import {
	EditRightPopperColumnSettingArea,
	EditRightPopperHeader,
	EditRightPopperSettingArea,
	EditRightPopperTableSettingArea,
} from '../block';
import { EditRightPopperProps } from '../../../interfaces';

export const EditRightPopper = ({ table }: EditRightPopperProps) => {
	const palette = usePalette();
	const breakpoint = useBreakPoint();
	const { EditRightPopperRef } = useLayout();
	const isLg: boolean = ['lg', 'xl'].includes(breakpoint);

	return (
		<Box
			ref={EditRightPopperRef}
			position="absolute"
			top="5px"
			right="5px"
			width={isLg ? '300px' : '250px'}
			height="calc(100% - 10px)"
			borderRadius="10px"
			border={`solid 1px ${palette.layout.editLayout.rightPopper.line}`}
			bgcolor={palette.layout.editLayout.rightPopper.bg}
			overflow="hidden"
		>
			<EditRightPopperHeader />
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				flexDirection="column"
				width="100%"
				height="calc(100% - 35px)"
				padding="10px"
				sx={{
					overflowY: 'scroll',
					'&::-webkit-scrollbar': {
						width: '0px',
					},
				}}
			>
				<EditRightPopperSettingArea title="テーブル設定">
					<EditRightPopperTableSettingArea table={table} />
				</EditRightPopperSettingArea>
				<EditRightPopperSettingArea title="カラム一覧">
					<EditRightPopperColumnSettingArea table={table} />
				</EditRightPopperSettingArea>
			</Box>
		</Box>
	);
};
