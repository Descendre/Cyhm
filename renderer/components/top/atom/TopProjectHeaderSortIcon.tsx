import { FilterList } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export const TopProjectHeaderSortIcon = () => {
	return (
		<Tooltip
			title="ソート"
			placement="bottom"
			sx={{
				cursor: 'pointer',
			}}
		>
			<FilterList fontSize="small" />
		</Tooltip>
	);
};
