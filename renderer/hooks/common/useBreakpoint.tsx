'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import { UseBreakpointProps } from '../../interfaces';

export const useBreakPoint = (): UseBreakpointProps => {
	const theme = useTheme();

	const isXs = useMediaQuery(theme.breakpoints.only('xs'));
	const isSm = useMediaQuery(theme.breakpoints.only('sm'));
	const isMd = useMediaQuery(theme.breakpoints.only('md'));
	const isLg = useMediaQuery(theme.breakpoints.only('lg'));

	const breakpoint = isXs
		? 'xs'
		: isSm
			? 'sm'
			: isMd
				? 'md'
				: isLg
					? 'lg'
					: 'xl';

	return breakpoint;
};
