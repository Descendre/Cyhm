import { Avatar, AvatarGroup } from '@mui/material';
import { useProject } from '../../../hooks';

export const EditHeaderAvatars = () => {
	const { currentProject } = useProject();

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
			{currentProject?.members.map((member) => (
				<Avatar key={member.userId} src={member.userImage} />
			))}
		</AvatarGroup>
	);
};
