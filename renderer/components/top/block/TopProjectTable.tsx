import { Table, TableBody, TableContainer } from '@mui/material';
import { TopProjectTableRow } from './TopProjectTableRow';

export const TopProjectTable = () => {
	return (
		<TableContainer>
			<Table sx={{ tableLayout: 'fixed' }}>
				<TableBody>
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
					<TopProjectTableRow />
				</TableBody>
			</Table>
		</TableContainer>
	);
};
