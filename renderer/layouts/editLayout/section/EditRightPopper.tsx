'use client';
import { Box } from '@mui/material';
import { useBreakPoint, useLayout, usePalette } from '../../../hooks';
import { EditRightPopperHeader } from '../block';

export const EditRightPopper = () => {
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
		</Box>
	);
};
