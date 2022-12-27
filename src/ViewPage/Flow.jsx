import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "../elements";

let clickedNodeId = null;

function Flow() {
  const [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);
  let handleClick = (e, node) => {
    clickedNodeId = node.id;
    console.log(clickedNodeId);
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
