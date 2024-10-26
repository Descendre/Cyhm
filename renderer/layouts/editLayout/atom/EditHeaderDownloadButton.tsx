'use client';
import { FileDownload, KeyboardArrowDown } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useBreakPoint, usePalette } from '../../../hooks';

export const EditHeaderDownloadButton = () => {
	const palette = usePalette();
	const breakpoint = useBreakPoint();
	const isMd: boolean = ['md', 'lg', 'xl'].includes(breakpoint);

	return (
		<Button
			variant="contained"
			size="small"
			title={isMd ? '' : 'ダウンロード'}
			disableTouchRipple
			startIcon={<FileDownload />}
			endIcon={<KeyboardArrowDown />}
			sx={{
				color: palette.text.secondary,
				bgcolor: palette.layout.editLayout.header.downLoadButton.bg,
				fontSize: '0.8rem',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				'&:hover': {
					bgcolor: palette.layout.editLayout.header.downLoadButton.hoverBg,
				},
			}}
		>
			{isMd ? 'ダウンロード' : ''}
		</Button>
	);
};
