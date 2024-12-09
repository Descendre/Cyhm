'use client';
import { Box } from '@mui/material';
import { EditReactFlowCustomNodeHeader } from '../atom';
import {
	EditReactFlowCustomNodeDataProps,
	EditReactFlowCustomNodeProps,
} from '../../../interfaces';
import { EditReactFlowCustomNodeColumn } from './EditReactFlowCustomNodeColumn';
import { useLayout, usePalette } from '../../../hooks';
import { EditReactFlowCustomNodeCommands } from './EditReactFlowCustomNodeCommands';

export const EditReactFlowCustomNode = ({
	data,
}: EditReactFlowCustomNodeProps) => {
	const { tableData }: EditReactFlowCustomNodeDataProps = data;
	const { name, color, id, isEditing } = tableData;
	const palette = usePalette();
	const { columns, selectedTableId } = useLayout();
	const isTableSelected: boolean = id === selectedTableId;

	return (
		<Box
			width="300px"
			sx={{
				'&:hover .customNodeCommands': {
					opacity: 1,
				},
			}}
		>
			<Box
				position="relative"
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				borderRadius={columns?.[id]?.length ? '10px' : '10px 10px 0 0'}
				overflow="hidden"
			>
				<EditReactFlowCustomNodeHeader title={name} color={color} />
				{columns &&
					columns[id]?.map((column, index) => (
						<EditReactFlowCustomNodeColumn
							key={column.id}
							color={
								index % 2 == 0
									? palette.components.edit.reactFlow.tableColumn.odd
									: palette.components.edit.reactFlow.tableColumn.even
							}
							column={column}
						/>
					))}

				<Box
					zIndex={100}
					position="absolute"
					display={isTableSelected ? 'block' : 'none'}
					top={0}
					left={0}
					width="100%"
					height="100%"
					border={`solid 2px ${palette.primary.main}`}
					borderRadius={columns?.[id]?.length > 0 ? '10px' : '10px 10px 0 0'}
					sx={{
						pointerEvents: 'none',
					}}
				/>

				<Box
					zIndex={50}
					position="absolute"
					display={!isEditing ? 'block' : 'none'}
					top={0}
					left={0}
					width="100%"
					height="100%"
					bgcolor={palette.components.edit.reactFlow.lockBg}
					borderRadius={columns?.[id]?.length > 0 ? '10px' : '10px 10px 0 0'}
					sx={{
						opacity: 0.5,
						pointerEvents: 'none',
					}}
				/>
			</Box>

			<EditReactFlowCustomNodeCommands table={tableData} />
		</Box>
	);
};
