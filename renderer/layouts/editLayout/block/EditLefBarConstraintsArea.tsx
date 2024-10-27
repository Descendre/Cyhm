import { Box } from '@mui/material';
import { ColumnConstraintProps, ColumnProps } from '../../../interfaces';
import {
	BlockOutlined,
	Check,
	DescriptionOutlined,
	Key,
	Link,
	StarOutline,
} from '@mui/icons-material';
import { usePalette } from '../../../hooks';

export const EditLefBarConstraintsArea = (column: ColumnProps) => {
	const palette = usePalette();

	const getConstraintIcon = (constraint: ColumnConstraintProps) => {
		if (typeof constraint === 'string') {
			switch (constraint) {
				case 'PRIMARY_KEY':
					return (
						<Key
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.primaryKey,
							}}
						/>
					);
				case 'NOT_NULL':
					return (
						<BlockOutlined
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.notNull,
							}}
						/>
					);
				case 'UNIQUE':
					return (
						<StarOutline
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.unique,
							}}
						/>
					);
				case 'FOREIGN_KEY':
					return (
						<Link
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.foreignKey,
							}}
						/>
					);
				default:
					return null;
			}
		} else if ('type' in constraint) {
			switch (constraint.type) {
				case 'CHECK':
					return (
						<Check
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.layout.editLayout.leftBar.constraint.check,
							}}
						/>
					);
				case 'DEFAULT':
					return (
						<DescriptionOutlined
							fontSize="small"
							sx={{
								fontSize: '0.9rem',
								color: palette.text.secondary,
							}}
						/>
					);
				default:
					return null;
			}
		}
		return null;
	};

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			gap="4px"
			flexGrow={1}
			height="100%"
			sx={{
				cursor: 'pointer',
			}}
		>
			{column.constraints.map((constraint, index) => (
				<Box key={index}>{getConstraintIcon(constraint)}</Box>
			))}
		</Box>
	);
};
