'use client';
import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const EditReactFlow = () => {
	const initialNodes = [
		{
			id: 'start',
			type: 'input',
			position: { x: 0, y: 0 },
			data: { label: 'start' },
		},
		{
			id: 'middle',
			position: { x: 0, y: 100 },
			data: { label: 'middle' },
		},
		{
			id: 'end',
			type: 'output',
			position: { x: 0, y: 200 },
			data: { label: 'end' },
		},
	];

	const initialEdges = [
		{ id: 'e1', source: 'start', target: 'middle' },
		{ id: 'e2', source: 'middle', target: 'end' },
	];

	return (
		<ReactFlow
			nodes={initialNodes}
			edges={initialEdges}
			colorMode="dark"
			fitView
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: 'transparent',
			}}
		>
			<MiniMap />
			<Controls />
			<Background bgColor="transparent" />
		</ReactFlow>
	);
};
