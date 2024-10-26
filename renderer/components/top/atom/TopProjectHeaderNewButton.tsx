import { AddCircleOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

export const TopProjectHeaderNewButton = () => {
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
		>
			プロジェクトを追加
		</Button>
	);
};
