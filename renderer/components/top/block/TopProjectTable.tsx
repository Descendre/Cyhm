import { Box, Table, TableBody, TableContainer } from '@mui/material';
import { TopProjectTableRow } from './TopProjectTableRow';
import { useProject } from '../../../hooks';
import { TopProjectSkeletonRow } from './TopProjectSkeletonRow';

export const TopProjectTable = () => {
	const { userProjects } = useProject();

	return (
		<>
			{userProjects ? (
				<TableContainer>
					<Table sx={{ tableLayout: 'fixed' }}>
						<TableBody>
							{userProjects?.map((userProject) => (
								<TopProjectTableRow
									key={userProject.id}
									project={userProject}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					flexDirection="column"
					gap="5px"
					width="100%"
					height="100%"
					overflow="hidden"
					sx={{
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'transparent',
						},
					}}
				>
					{Array.from({ length: 20 }, (_, index) => (
						<TopProjectSkeletonRow key={index} />
					))}
				</Box>
			)}
		</>
	);
};
