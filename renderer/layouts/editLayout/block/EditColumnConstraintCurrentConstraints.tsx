import { Box } from '@mui/material';
import { EditColumnConstraintCurrentConstraintsProps } from '../../../interfaces';
import { useProject } from '../../../hooks';
import { EditColumnConstraintSqliteAddingArea } from './EditColumnConstraintSqliteAddingArea';
import { EditColumnConstraintColumnSqlite } from './EditColumnConstraintColumnSqlite';

export const EditColumnConstraintCurrentConstraints = ({
	column,
}: EditColumnConstraintCurrentConstraintsProps) => {
	const { currentProject, columnConstraintEditInfo } = useProject();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			gap="15px"
			width="100%"
			padding="15px 0"
		>
			{columnConstraintEditInfo?.columnId == column.id &&
				currentProject.dbType === 'SQLITE' && (
					<EditColumnConstraintSqliteAddingArea column={column} />
				)}
			<Box
				display={column.columnConstraints.length > 0 ? 'flex' : 'none'}
				justifyContent="start"
				alignItems="center"
				flexDirection="column"
				gap="15px"
				width="100%"
				padding="15px"
			>
				{currentProject.dbType === 'SQLITE' ? (
					column.columnConstraints.map((constraint) => (
						<EditColumnConstraintColumnSqlite
							key={constraint.id}
							type={constraint.type}
							column={column}
							constraint={constraint}
						/>
					))
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
};
