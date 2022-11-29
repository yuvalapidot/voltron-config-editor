import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "../elements";

function Flow() {
  console.log("in flow func");
  console.log(nodes);
  console.log(edges);
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Flow;
