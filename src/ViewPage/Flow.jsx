import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useEdgesState,
  updateEdge,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { edges } from "../elements";

function Flow(props) {
  // State edgesWithState: make the calculated edges of elements into state
  const [edgesWithState, setEdges, onEdgesChange] = useEdgesState(edges);

  // So we can freely move the edges in the UI
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  // So we can add edges in the UI
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  let handleNodeClick = (e, node) => {
    // props.updateNodeId({ nodeId: node.id, nodeName: node.data.label });
    props.updateNodeId(node);
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
      fitView
    >
      <Background />
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
