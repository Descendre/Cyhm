import { Box } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import {
	EditLeftBarHeader,
	EditLeftBarNewBorn,
	EditLeftBarTableHeader,
} from '../block';
import { TableProps } from '../../../interfaces';

export const EditLeftBar = () => {
	const palette = usePalette();
	const { isTableAddMode, tables } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="250px"
			height="100%"
			borderRight={`solid 1px ${palette.layout.editLayout.header.line}`}
			bgcolor={palette.layout.editLayout.leftBar.bg}
		>
			<EditLeftBarHeader />
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				flexDirection="column"
				width="100%"
				height="calc(100% - 35px)"
				sx={{
					overflowY: 'overlay',
					'&:not(:hover)': {
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'transparent',
						},
					},
				}}
			>
				{isTableAddMode && <EditLeftBarNewBorn mode="table" />}
				{tables &&
					Object.values(tables).map((table: TableProps) => (
						<EditLeftBarTableHeader
							key={table.id}
							tableId={table.id}
							bg={table.color}
							text={table.name}
							isExpanded={table.isExpanded}
						/>
					))}
			</Box>
		</Box>
	);
};
