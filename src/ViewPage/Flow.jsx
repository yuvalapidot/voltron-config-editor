import React, { useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "../elements";

function Flow(props) {
  const [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);

  useEffect(() => {
    setNodes((nodesWithState) =>
      nodesWithState.map((node) => {
        if (node.id === props.changesToApply.nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: props.changesToApply.newName,
          };
        }

        return node;
      })
    );
  }, [props.changesToApply]);

  let handleClick = (e, node) => {
    props.updateNodeId({ nodeId: node.id, nodeName: node.data.label });
  };

  return (
    <ReactFlow
      nodes={nodesWithState}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodeClick={handleClick}
      fitView
    >
      <Background />
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
