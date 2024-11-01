import { List } from '@mui/material';
import { useProject } from '../../../hooks';
import { EditHeaderUserPopperMemberListItem } from '../atom';

export const EditHeaderUserPopperMemberList = () => {
	const { currentProject } = useProject();

	return (
		<List
			sx={{
				width: '100%',
				height: '100%',
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			{currentProject?.members?.map((member) => (
				<EditHeaderUserPopperMemberListItem
					key={member.userId}
					member={member}
				/>
			))}
		</List>
	);
};
