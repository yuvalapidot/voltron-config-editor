import React, { useEffect, useCallback, useState} from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  updateEdge,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "../../../elements";

function Flow(props) {
  
  const [edgesWithState, setEdges, onEdgesChange] = useEdgesState(edges);
  const [flowTransform, setFlowTransform] = useState({ x: 0, y: 0, zoom: 1 });

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

 let handleNodeClick = (e, node) => {
    // props.updateNodeId({ nodeId: node.id, nodeName: node.data.label });
    props.updateNodeId(node);
    
     // setFlowTransform({ ...flowTransform, zoom: newZoom});
  };

  let handlePaneClick = (e) => {
    props.updateNodeId({
      nodeId: "0",
      nodeName: "choose element from the graph",
    });
  };

  return (
    <ReactFlow 
      nodes={props.nodesWithState}
      edges={edgesWithState}
      onNodesChange={props.onNodesChange}
      onEdgesChange={onEdgesChange}
      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onConnect={onConnect}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      style={{ width: '100%', height: '100%' }}
      transform={flowTransform}

      fitView
    >
      <Background />
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
