'use client';
import { FileDownload, KeyboardArrowDown } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useBreakPoint, usePopper } from '../../../hooks';
import { EditHeaderDownloadPopper } from '../block';

export const EditHeaderDownloadButton = () => {
	const breakpoint = useBreakPoint();
	const isMd: boolean = ['md', 'lg', 'xl'].includes(breakpoint);
	const { anchorEl, parentRef, popperRef, handleOpen } = usePopper<
		HTMLButtonElement,
		HTMLButtonElement
	>({});

	return (
		<>
			<Button
				variant="contained"
				color="secondary"
				size="small"
				title={isMd ? '' : 'ダウンロード'}
				disableTouchRipple
				startIcon={<FileDownload />}
				endIcon={<KeyboardArrowDown />}
				onClick={handleOpen}
				ref={parentRef}
				sx={{
					fontSize: '0.8rem',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{isMd ? 'ダウンロード' : ''}
			</Button>

			<EditHeaderDownloadPopper
				open={Boolean(anchorEl)}
				popperRef={popperRef}
				anchorEl={anchorEl}
			/>
		</>
	);
};
