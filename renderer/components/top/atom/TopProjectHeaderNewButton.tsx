import { AddCircleOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { usePopper } from '../../../hooks';
import { TopProjectStartPopper } from './TopProjectStartPopper';

export const TopProjectHeaderNewButton = () => {
	const { anchorEl, parentRef, popperRef, handleOpen } = usePopper<
		HTMLButtonElement,
		HTMLButtonElement
	>({});

	return (
		<>
			<Button
				disableTouchRipple
				variant="contained"
				color="primary"
				size="small"
				endIcon={<AddCircleOutlined />}
				sx={{
					fontSize: '0.8rem',
				}}
				onClick={handleOpen}
				ref={parentRef}
			>
				プロジェクトを追加
			</Button>

			<TopProjectStartPopper
				open={Boolean(anchorEl)}
				popperRef={popperRef}
				anchorEl={anchorEl}
			/>
		</>
	);
};
