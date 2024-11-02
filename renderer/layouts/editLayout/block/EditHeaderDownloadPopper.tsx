import { Box, List, Popper } from '@mui/material';
import { useDownload, usePalette } from '../../../hooks';
import { EditHeaderDownloadPopperProps } from '../../../interfaces';
import { DataObject, Description, Storage } from '@mui/icons-material';
import { EditHeaderDownloadPopperListItem } from '../atom/EditHeaderDownloadPopperListItem';

export const EditHeaderDownloadPopper = ({
	open,
	popperRef,
	anchorEl,
}: EditHeaderDownloadPopperProps) => {
	const palette = usePalette();
	const { handleDownloadToDB, handleDownloadToCSV, handleDownloadToJSON } =
		useDownload();

	return (
		<Popper
			open={open}
			ref={popperRef}
			anchorEl={anchorEl}
			placement="bottom-start"
			modifiers={[
				{
					name: 'offset',
					options: {
						offset: [0, 10],
					},
				},
			]}
		>
			<Box
				width="300px"
				height="500px"
				maxHeight="calc(100vh - 50px)"
				bgcolor={palette.layout.editLayout.header.userPoper.bg}
				border={`solid 1px ${palette.layout.editLayout.header.userPoper.line}`}
				borderRadius="0 0 5px 5px"
				overflow="hidden"
				sx={{
					boxShadow: palette.layout.editLayout.header.userPoper.boxShadow,
				}}
			>
				<List
					sx={{
						padding: 0,
					}}
				>
					<EditHeaderDownloadPopperListItem
						primary="DB"
						secondary="DB形式でダウンロード"
						icon={<Storage fontSize="small" sx={{ fontSize: '1rem' }} />}
						onClick={async () => await handleDownloadToDB()}
					/>
					<EditHeaderDownloadPopperListItem
						primary="CSV"
						secondary="CSV形式でダウンロード"
						icon={<Description fontSize="small" sx={{ fontSize: '1rem' }} />}
						onClick={async () => await handleDownloadToCSV()}
					/>
					<EditHeaderDownloadPopperListItem
						primary="JSON"
						secondary="JSON形式でダウンロード"
						icon={<DataObject fontSize="small" sx={{ fontSize: '1rem' }} />}
						onClick={async () => await handleDownloadToJSON()}
					/>
				</List>
			</Box>
		</Popper>
	);
};
