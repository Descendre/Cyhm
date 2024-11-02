import { Avatar, AvatarGroup } from '@mui/material';
import { usePopper, useProject } from '../../../hooks';
import { EditHeaderUserPopper } from './EditHeaderUserPopper';

export const EditHeaderAvatars = () => {
	const { currentProject } = useProject();
	const { anchorEl, setAnchorEl, parentRef, popperRef, handleOpen } = usePopper<
		HTMLDivElement,
		HTMLDivElement
	>({});

	return (
		<>
			<AvatarGroup
				max={5}
				title="メンバー設定"
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
				ref={parentRef}
				onClick={handleOpen}
			>
				{currentProject?.members?.map((member) => (
					<Avatar key={member.userId} src={member.userImage} />
				))}
			</AvatarGroup>

			<EditHeaderUserPopper
				open={Boolean(anchorEl)}
				popperRef={popperRef}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
			/>
		</>
	);
};
