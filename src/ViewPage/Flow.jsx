import React, { useEffect, useCallback } from "react";
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
import { nodes, edges } from "../elements";

function Flow(props) {
  const [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesWithState, setEdges, onEdgesChange] = useEdgesState(edges);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  useEffect(() => {
    setNodes((nodesWithState) =>
      nodesWithState.map((node) => {
        if (node.id === props.changesToApply.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: props.changesToApply.data.label,
          };
          node.class = props.changesToApply.class;
          //check if its a phase
          if (node.stringType === "phase") {
            node.pType = props.changesToApply.pType;
            console.log(props.changesToApply.pType);
          }
          // node.enable = props.changesToApply.enable;
        }

        return node;
      })
    );
    console.log(nodesWithState);
    console.log(edgesWithState);
  }, [props.changesToApply]);

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
      nodes={nodesWithState}
      edges={edgesWithState}
      onNodesChange={onNodesChange}
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
