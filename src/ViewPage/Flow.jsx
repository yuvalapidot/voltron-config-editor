import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "../elements";

let needToUpdateNodes = true;

function Flow() {
  const [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);

  return (
    <ReactFlow
      nodes={nodesWithState}
      edges={edges}
      onNodesChange={onNodesChange}
      fitView
    >
      <Background />
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
