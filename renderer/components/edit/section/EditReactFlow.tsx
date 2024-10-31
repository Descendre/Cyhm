'use client';
import { Node, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
	EditReactFlowBackground,
	EditReactFlowControls,
	EditReactFlowMiniMap,
} from '../block';
import { EditReactFlowCustomNode } from '../block/EditReactFlowCustomNode';
import { useLayout, useProject } from '../../../hooks';
import { useEffect } from 'react';
import { EditReactFlowCustomNodeDataProps } from '../../../interfaces';

export const EditReactFlow = () => {
	const {
		handleGetNodesFromTables,
		EditReactFlowAreaRef,
		tables,
		handleSelectTable,
	} = useLayout();
	const { handleNodeDragStop } = useProject();
	const [nodes, setNodes, onNodesChange] = useNodesState(
		handleGetNodesFromTables()
	); // useNodesStateを使用
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	useEffect(() => {
		setNodes(handleGetNodesFromTables());
		console.log(edges, setEdges);
	}, [tables]);

	return (
		<ReactFlow
			ref={EditReactFlowAreaRef}
			colorMode="dark"
			nodes={nodes} // 状態からノードを取得
			onNodesChange={onNodesChange} // ノードの変更を処理
			onEdgesChange={onEdgesChange} // エッジの変更を処理（必要に応じて）
			onNodeDragStop={(event, node) => handleNodeDragStop({ node: node })}
			onNodeClick={(
				event: React.MouseEvent,
				node: Node<EditReactFlowCustomNodeDataProps>
			) => handleSelectTable(node.data.tableData)}
			onPaneClick={() => handleSelectTable(null)}
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
