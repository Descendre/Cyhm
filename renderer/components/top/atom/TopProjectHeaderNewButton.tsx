// "use client"
import { AddCircleOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useLayout } from '../../../hooks';

export const TopProjectHeaderNewButton = () => {
	const { handleStartProject } = useLayout();

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
			onClick={() => handleStartProject()}
		>
			プロジェクトを追加
		</Button>
	);
};
