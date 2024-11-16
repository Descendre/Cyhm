'use client';
import { Box, Button, Grow, Modal } from '@mui/material';
import React from 'react';
import { AppSelectModalProps } from '../../interfaces';
import { usePalette } from '../../hooks';
import { LoadingButton } from '@mui/lab';

export const AppSelectModal = ({
	isOpen,
	outerClose,
	closeModal,
	acceptFunc,
	rejectFunc,
	children,
	acceptColor,
	rejectColor,
	acceptIcon,
	rejectIcon,
	acceptText,
	rejectText,
	loading,
}: AppSelectModalProps) => {
	const palette = usePalette();

	const handleOnClose = (): void => {
		if (outerClose) {
			closeModal();
		}
	};

	return (
		<Modal
			open={isOpen}
			onClose={() => handleOnClose()}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			slotProps={{
				backdrop: {
					sx: {
						backgroundColor: palette.components.common.appSelectModal.backdrop,
					},
				},
			}}
		>
			<Grow in={isOpen} timeout={200}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					flexDirection="column"
					width="350px"
					height="250px"
					padding="40px 30px"
					bgcolor={palette.components.common.appSelectModal.bg}
					borderRadius="5px"
					overflow="hidden"
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						gap="30px"
						width="100%"
						height="100%"
					>
						<Box
							width="100%"
							flexGrow={1}
							sx={{
								overflowY: 'overlay',
								'&:not(:hover)': {
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: 'transparent',
									},
								},
							}}
						>
							{children}
						</Box>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							gap="10px"
							width="100%"
						>
							<Button
								fullWidth
								size="small"
								variant="contained"
								disableTouchRipple
								color={rejectColor}
								onClick={rejectFunc}
								startIcon={rejectIcon}
							>
								{rejectText}
							</Button>
							<LoadingButton
								loading={loading}
								fullWidth
								size="small"
								variant="contained"
								disableTouchRipple
								color={acceptColor}
								onClick={acceptFunc}
								startIcon={acceptIcon}
							>
								{acceptText}
							</LoadingButton>
						</Box>
					</Box>
				</Box>
			</Grow>
		</Modal>
	);
};
