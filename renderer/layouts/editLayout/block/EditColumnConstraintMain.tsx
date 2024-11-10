import { Box } from '@mui/material';
import { EditColumnConstraintColumnSection } from '../atom/EditColumnConstraintColumnSection';
import { EditColumnConstraintMainProps } from '../../../interfaces';
import { useLayout } from '../../../hooks';

export const EditColumnConstraintMain = ({
	table,
}: EditColumnConstraintMainProps) => {
	const { columns } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="calc(100% - 200px)"
			height="100%"
			padding="20px 0"
			sx={{
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				flexDirection="column"
				width="90%"
			>
				{columns[table.id]?.map((column) => (
					<EditColumnConstraintColumnSection
						key={column.id}
						table={table}
						column={column}
					>
						<></>
					</EditColumnConstraintColumnSection>
				))}
			</Box>
		</Box>
	);
};
