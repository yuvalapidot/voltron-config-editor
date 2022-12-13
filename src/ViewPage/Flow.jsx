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

  console.log("in flow after update");
  console.log(nodesWithState);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodesWithState}
        edges={edges}
        onNodesChange={onNodesChange}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Flow;
