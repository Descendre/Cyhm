import { AvatarGroup } from '@mui/material';
import { EditHeaderAvatar } from '../atom';

export const EditHeaderAvatars = () => {
	return (
		<AvatarGroup
			max={5}
			sx={{
				alignItems: 'center',
				height: '100%',
				cursor: 'pointer',
				'& .MuiAvatar-root': {
					width: '30px',
					height: '30px',
					fontSize: '1rem',
				},
			}}
		>
			<EditHeaderAvatar />
			<EditHeaderAvatar />
			<EditHeaderAvatar />
			<EditHeaderAvatar />
			<EditHeaderAvatar />
			<EditHeaderAvatar />
			<EditHeaderAvatar />
		</AvatarGroup>
	);
};
