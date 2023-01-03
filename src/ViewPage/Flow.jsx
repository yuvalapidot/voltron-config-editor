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
        if (node.id === props.changesToApply.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: props.changesToApply.data.label,
          };
        }

        return node;
      })
    );
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
      edges={edges}
      onNodesChange={onNodesChange}
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
