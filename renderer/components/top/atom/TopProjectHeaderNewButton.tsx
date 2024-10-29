import { AddCircleOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useProject } from '../../../hooks';
import { useSession } from 'next-auth/react';

export const TopProjectHeaderNewButton = () => {
	const { data: session } = useSession();
	const { handleCreateProject } = useProject();

	return (
		<Button
			disableTouchRipple
			variant="contained"
			color="primary"
			size="small"
			endIcon={<AddCircleOutlined />}
			sx={{
				fontSize: '0.8rem',
			}}
			onClick={() => handleCreateProject({ userId: session?.user.id })}
		>
			プロジェクトを追加
		</Button>
	);
};
