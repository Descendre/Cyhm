'use client';
import { Box, Popper } from '@mui/material';
import { EditHeaderUserPopperProps } from '../../../interfaces';
import { useBreakPoint, usePalette } from '../../../hooks';
import { EditHeaderUserPopperHeader } from './EditHeaderUserPopperHeader';
import { useState } from 'react';
import { EditHeaderUserPopperMemberList } from './EditHeaderUserPopperMemberList';
import { EditHeaderUserPopperInviteList } from './EditHeaderUserPopperInviteList';

export const EditHeaderUserPopper = ({
	open,
	popperRef,
	anchorEl,
	setAnchorEl,
}: EditHeaderUserPopperProps) => {
	const palette = usePalette();
	const breakpoint = useBreakPoint();
	const isLg: boolean = ['lg', 'xl'].includes(breakpoint);
	const [isUserView, setIsUserView] = useState<boolean>(true);

	return (
		<Popper open={open} ref={popperRef} anchorEl={anchorEl} placement="bottom">
			<Box
				width={isLg ? '350px' : '300px'}
				height="calc(100vh - 150px)"
				bgcolor={palette.layout.editLayout.header.userPoper.bg}
				border={`solid 1px ${palette.layout.editLayout.header.userPoper.line}`}
				borderRadius="0 0 0 5px"
				overflow="hidden"
				sx={{
					boxShadow: palette.layout.editLayout.header.userPoper.boxShadow,
				}}
			>
				<EditHeaderUserPopperHeader
					setAnchorEl={setAnchorEl}
					isUserView={isUserView}
					setIsUserView={setIsUserView}
				/>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					flexDirection="column"
					width="100%"
					height="calc(100% - 85px)"
				>
					{isUserView ? (
						<EditHeaderUserPopperMemberList />
					) : (
						<EditHeaderUserPopperInviteList />
					)}
				</Box>
			</Box>
		</Popper>
	);
};
