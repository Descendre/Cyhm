'use client';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Chip, Tooltip } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useModal, usePalette } from '../../../hooks';
import { AppModal } from '../../../components';

export const TopHeaderAvatar = () => {
	const { data: session } = useSession();
	const { isOpen, openModal, closeModal } = useModal();
	const palette = usePalette();

	return (
		<>
			<Tooltip title={session?.user?.name} placement="bottom">
				<Chip
					variant="outlined"
					avatar={<Avatar src={session?.user?.image} />}
					label={session?.user?.name}
					deleteIcon={<ArrowDropDown />}
					onDelete={() => openModal()}
					sx={{
						paddingLeft: '5px',
						marginLeft: '13px',
						cursor: 'pointer',
						'&:hover': {
							border: `solid 1px ${palette.primary.main}`,
							backgroundColor: 'transparent !important',
						},
					}}
					onClick={() => openModal()}
				/>
			</Tooltip>

			<AppModal isOpen={isOpen} closeModal={closeModal}>
				<button onClick={() => signOut()}>aaaaaaaaaaa</button>
			</AppModal>
		</>
	);
};
