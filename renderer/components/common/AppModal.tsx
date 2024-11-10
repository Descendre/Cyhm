'use client';
import { Box, Grow, Modal } from '@mui/material';
import React from 'react';
import { AppModalProps } from '../../interfaces';
import { usePalette } from '../../hooks';
import { AppModalHeader } from './section';

export const AppModal = ({
	isOpen,
	outerClose,
	closeModal,
	width,
	height,
	maxWidth,
	maxHeight,
	minWidth,
	minHeight,
	icon,
	title,
	children,
}: AppModalProps) => {
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
						backgroundColor: palette.components.common.appModal.backdrop,
					},
				},
			}}
		>
			<Grow in={isOpen} timeout={200}>
				<Box
					width={width}
					height={height}
					maxWidth={maxWidth || '100vw'}
					maxHeight={maxHeight || '100vh'}
					minWidth={minWidth || '0px'}
					minHeight={minHeight || '0px'}
					bgcolor={palette.components.common.appModal.bg}
					borderRadius="5px"
					overflow="hidden"
				>
					<AppModalHeader title={title} icon={icon} closeModal={closeModal} />
					{children}
				</Box>
			</Grow>
		</Modal>
	);
};
