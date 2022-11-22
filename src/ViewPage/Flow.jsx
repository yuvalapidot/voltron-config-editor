import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { nodes } from "../elements";

function Flow() {
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
