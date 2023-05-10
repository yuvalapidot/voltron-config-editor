import React, { useEffect, useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  updateEdge,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import SaveRestore from "../../SaveRestore";
import { nodes, edges } from "../../../elements";

function Flow(props) {
  const [flowTransform, setFlowTransform] = useState({ x: 0, y: 0, zoom: 1 });
  const { setCenter } = useReactFlow();
  console.log(typeof props.setNodes);
  // This function handles the click event on a node in the tree.
  let handleNodeClick = (e, node) => {
    props.updateNodeId(node);
    focusNode(node);
    console.log(node);
  };

  // focusNode: This function is used to zoom in on a node when it is clicked on. It is called in the onClick function of the Node component.
  const focusNode = (node) => {
    if (node.stringType === "pipeline") {
      const x = node.positionAbsolute.x + node.width / 2;
      const y = node.positionAbsolute.y + node.height / 2;
      const zoom = 0.5;
      setCenter(x, y, { zoom, duration: 1000 });
    } else {
      const x = node.positionAbsolute.x + node.width / 2;
      const y = node.positionAbsolute.y + node.height / 2;
      const zoom = 1.85;
      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  // This function handles a user clicking on a pane
  // If the user clicks on a pane, the node id and node name are set to 0
  // This is used to reset the node id and node name when the user clicks on a pane
  let handlePaneClick = (e) => {
    props.updateNodeId({
      nodeId: "0",
      nodeName: "choose element from the graph",
    });
  };

  return (
    <ReactFlow
      nodes={props.nodesWithState}
      edges={props.edgesWithState}
      onNodesChange={props.onNodesChange}
      onEdgesChange={props.onEdgesChange}
      snapToGrid
      onEdgeUpdate={props.onEdgeUpdate}
      onConnect={props.onConnect}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      style={{ width: "100%", height: "100%" }}
      transform={flowTransform}
      fitView
    >
      <Background />
      <MiniMap zoomable pannable />
      <SaveRestore 
        nodes={props.nodesWithState}
        edges={props.edgesWithState}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
        setNodes={(n) => props.setNodes(n)}
        setEdges={(e) => props.setEdges(e)}
      />
      {/* <Controls /> */}
    </ReactFlow>
  );
}
function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
export default FlowWithProvider;
