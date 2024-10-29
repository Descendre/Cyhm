import { Table, TableBody, TableContainer } from '@mui/material';
import { TopProjectTableRow } from './TopProjectTableRow';
import { useProject } from '../../../hooks';

export const TopProjectTable = () => {
	const { userProjects } = useProject();

	return (
		<TableContainer>
			<Table sx={{ tableLayout: 'fixed' }}>
				<TableBody>
					{userProjects?.map((userProject) => (
						<TopProjectTableRow key={userProject.id} project={userProject} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
