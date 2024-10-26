'use client';
import { ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
	EditReactFlowBackground,
	EditReactFlowControls,
	EditReactFlowMiniMap,
} from '../block';
import { EditReactFlowCustomNode } from '../block/EditReactFlowCustomNode';
import { useLayout } from '../../../hooks';
import { useEffect } from 'react';

export const EditReactFlow = () => {
	const { handleGetNodesFromTables, tables } = useLayout();
	const [nodes, setNodes, onNodesChange] = useNodesState(
		handleGetNodesFromTables()
	); // useNodesStateを使用
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	console.log(edges, setEdges);

	useEffect(() => {
		setNodes(handleGetNodesFromTables());
	}, [tables]);

	return (
		<ReactFlow
			colorMode="dark"
			nodes={nodes} // 状態からノードを取得
			onNodesChange={onNodesChange} // ノードの変更を処理
			onEdgesChange={onEdgesChange} // エッジの変更を処理（必要に応じて）
			// nodes={handleGetNodesFromTables()}
			nodeTypes={{ editRectFlowCustomNode: EditReactFlowCustomNode }}
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
