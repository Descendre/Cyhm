'use client';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
	EditReactFlowBackground,
	EditReactFlowControls,
	EditReactFlowMiniMap,
} from '../block';

export const EditReactFlow = () => {
	return (
		<ReactFlow
			colorMode="dark"
			fitView
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: 'transparent',
			}}
		>
			<EditReactFlowMiniMap />
			<EditReactFlowControls />
			<EditReactFlowBackground />
		</ReactFlow>
	);
};
