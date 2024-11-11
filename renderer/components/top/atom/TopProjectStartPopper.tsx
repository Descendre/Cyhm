import { Box, List, Popper } from '@mui/material';
import { TopProjectStartPopperProps } from '../../../interfaces';
import { usePalette, useProject } from '../../../hooks';
import { TopProjectStartPopperListItem } from './TopProjectStartPopperListItem';
import { useSession } from 'next-auth/react';

export const TopProjectStartPopper = ({
	open,
	popperRef,
	anchorEl,
}: TopProjectStartPopperProps) => {
	const palette = usePalette();
	const { handleCreateProject } = useProject();
	const { data: session } = useSession();

	return (
		<Popper
			open={open}
			ref={popperRef}
			anchorEl={anchorEl}
			placement="bottom-start"
		>
			<Box
				width="225px"
				height="300px"
				maxHeight="calc(100vh - 50px)"
				bgcolor={palette.layout.editLayout.header.userPoper.bg}
				border={`solid 1px ${palette.layout.editLayout.header.userPoper.line}`}
				borderRadius="0 0 5px 5px"
				overflow="hidden"
				sx={{
					boxShadow: palette.layout.editLayout.header.userPoper.boxShadow,
					overflowY: 'overlay',
					'&:not(:hover)': {
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'transparent',
						},
					},
				}}
			>
				<List
					sx={{
						padding: 0,
					}}
				>
					<TopProjectStartPopperListItem
						primary="SQlite"
						secondary="SQliteプロジェクトを開始"
						onClick={() =>
							handleCreateProject({
								userId: session?.user.id,
								dbType: 'SQLITE',
							})
						}
					/>
				</List>
			</Box>
		</Popper>
	);
};
