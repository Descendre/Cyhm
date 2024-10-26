'use client';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Chip, Tooltip } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useModal } from '../../../hooks';
import { AppModal } from '../../../components';

export const TopHeaderAvatar = () => {
	const { data: session } = useSession();
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<>
			<Tooltip title={session?.user?.name} placement="bottom">
				<Chip
					variant="outlined"
					avatar={<Avatar src={session?.user?.image} />}
					label={session?.user?.name}
					deleteIcon={<ArrowDropDown />}
					onDelete={() => {}}
					sx={{
						paddingLeft: '5px',
						marginLeft: '13px',
						cursor: 'pointer',
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
