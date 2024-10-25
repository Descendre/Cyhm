import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';
import { signOut } from 'next-auth/react';
import React from 'react';

export const TopHeaderAvatar = () => {
	return (
		<Chip
			variant="outlined"
			avatar={<Avatar src={''} />}
			label={'hello world'}
			deleteIcon={<ArrowDropDown />}
			onDelete={() => {}}
			sx={{
				paddingLeft: '5px',
				marginLeft: '13px',
				cursor: 'pointer',
			}}
			onClick={() => signOut()}
		/>
	);
};
