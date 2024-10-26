'use client';
import { FileDownload, KeyboardArrowDown } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useBreakPoint } from '../../../hooks';

export const EditHeaderDownloadButton = () => {
	const breakpoint = useBreakPoint();
	const isMd: boolean = ['md', 'lg', 'xl'].includes(breakpoint);

	return (
		<Button
			variant="contained"
			color="secondary"
			size="small"
			title={isMd ? '' : 'ダウンロード'}
			disableTouchRipple
			startIcon={<FileDownload />}
			endIcon={<KeyboardArrowDown />}
			sx={{
				fontSize: '0.8rem',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		>
			{isMd ? 'ダウンロード' : ''}
		</Button>
	);
};
