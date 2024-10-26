import { Apps } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export const TopProjectHeaderViewModeIcon = () => {
	return (
		<Tooltip
			title="グリッドで表示"
			placement="bottom"
			sx={{
				cursor: 'pointer',
			}}
		>
			<Apps fontSize="small" />
		</Tooltip>
	);
};
