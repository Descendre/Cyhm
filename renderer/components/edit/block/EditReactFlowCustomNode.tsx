import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import { EditReactFlowCustomNodeHeader } from '../atom';
import {
	EditReactFlowCustomNodeDataProps,
	EditReactFlowCustomNodeProps,
} from '../../../interfaces';
import { EditReactFlowCustomNodeColumn } from './EditReactFlowCustomNodeColumn';
import { usePalette } from '../../../hooks';

export const EditReactFlowCustomNode = ({
	data,
}: EditReactFlowCustomNodeProps) => {
	const { title, color }: EditReactFlowCustomNodeDataProps = data;
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			width="300px"
			borderRadius="10px"
			overflow="hidden"
		>
			<EditReactFlowCustomNodeHeader title={title} color={color} />
			<EditReactFlowCustomNodeColumn
				color={palette.components.edit.reactFlow.tableColumn.odd}
			/>
			<EditReactFlowCustomNodeColumn
				color={palette.components.edit.reactFlow.tableColumn.even}
			/>
			<EditReactFlowCustomNodeColumn
				color={palette.components.edit.reactFlow.tableColumn.odd}
			/>
			<EditReactFlowCustomNodeColumn
				color={palette.components.edit.reactFlow.tableColumn.even}
			/>
			<Handle type="source" position={Position.Right} />
			<Handle type="target" position={Position.Left} />
		</Box>
	);
};
