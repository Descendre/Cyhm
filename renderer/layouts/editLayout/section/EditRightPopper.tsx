'use client';
import { Box } from '@mui/material';
import { useBreakPoint, usePalette } from '../../../hooks';

export const EditRightPopper = () => {
	const palette = usePalette();
	const breakpoint = useBreakPoint();
	const isLg: boolean = ['lg', 'xl'].includes(breakpoint);

	return (
		<Box
			position="fixed"
			top="55px"
			right="5px"
			width={isLg ? '300px' : '250px'}
			height="calc(100vh - 60px)"
			borderRadius="10px"
			border={`solid 1px ${palette.layout.editLayout.rightPopper.line}`}
			bgcolor={palette.layout.editLayout.rightPopper.bg}
		></Box>
	);
};
