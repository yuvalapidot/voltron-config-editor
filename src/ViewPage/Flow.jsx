import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges, updateParentSize } from "../elements";

let needToUpdateNodes = true;

function Flow() {
  console.log("in flow func");
  console.log(nodes);

  const [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);

  if (needToUpdateNodes) {
    setNodes((nds) => updateParentSize(nds));
    needToUpdateNodes = false;
  }

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
