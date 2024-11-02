'use client';
import { Box, Popper } from '@mui/material';
import { EditHeaderUserPopperProps } from '../../../interfaces';
import { useBreakPoint, useLayout, usePalette } from '../../../hooks';
import { EditHeaderUserPopperHeader } from './EditHeaderUserPopperHeader';
import { EditHeaderUserPopperMemberList } from './EditHeaderUserPopperMemberList';
import { EditHeaderUserPopperInviteList } from './EditHeaderUserPopperInviteList';
import { EditHeaderUserPopperInvitedList } from './EditHeaderUserPopperInvitedList';

export const EditHeaderUserPopper = ({
	open,
	popperRef,
	anchorEl,
	setAnchorEl,
}: EditHeaderUserPopperProps) => {
	const palette = usePalette();
	const { userPopperViewMode } = useLayout();
	const breakpoint = useBreakPoint();
	const isLg: boolean = ['lg', 'xl'].includes(breakpoint);

	return (
		<Popper open={open} ref={popperRef} anchorEl={anchorEl} placement="bottom">
			<Box
				width={isLg ? '350px' : '300px'}
				height="500px"
				maxHeight="calc(100vh - 50px)"
				bgcolor={palette.layout.editLayout.header.userPoper.bg}
				border={`solid 1px ${palette.layout.editLayout.header.userPoper.line}`}
				borderRadius="0 0 0 5px"
				overflow="hidden"
				sx={{
					boxShadow: palette.layout.editLayout.header.userPoper.boxShadow,
				}}
			>
				<EditHeaderUserPopperHeader setAnchorEl={setAnchorEl} />
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					flexDirection="column"
					width="100%"
					height="calc(100% - 85px)"
				>
					{userPopperViewMode === 'member' ? (
						<EditHeaderUserPopperMemberList />
					) : userPopperViewMode === 'invite' ? (
						<EditHeaderUserPopperInviteList />
					) : (
						<EditHeaderUserPopperInvitedList />
					)}
				</Box>
			</Box>
		</Popper>
	);
};
