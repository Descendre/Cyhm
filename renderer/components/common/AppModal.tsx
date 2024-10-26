'use client';
import { Box, Grow, Modal } from '@mui/material';
import React from 'react';
import { AppModalProps } from '../../interfaces';
import { usePalette } from '../../hooks';

export const AppModal = ({ isOpen, closeModal, children }: AppModalProps) => {
	const palette = usePalette();

	return (
		<Modal
			open={isOpen}
			onClose={() => closeModal()}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Grow in={isOpen} timeout={200}>
				<Box
					width="500px"
					height="400px"
					bgcolor={palette.components.common.appModal.bg}
					borderRadius="5px"
					overflow="hidden"
				>
					{children}
				</Box>
			</Grow>
		</Modal>
	);
};
