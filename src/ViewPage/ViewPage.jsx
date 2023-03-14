import React, { useState, useEffect } from "react";
import Flow from "./Flow";
import "./ViewPage.scss";
import EditWindow from "./EditWindow";
import ReactFlow, {
  useNodesState,
} from "reactflow";
import { nodes} from "../elements";

function ViewPage() {
  const  [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);

  let [clickedNodeInfo, setClickedNodeInfo] = useState({
    nodeName: "choose element from the graph",
    id: "0",
  });
  let [changesToApply, setChangesToApply] = useState({});


  useEffect(() => {
    setNodes((nodesWithState) =>
      nodesWithState.map((node) => {
        if (node.id === changesToApply.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: changesToApply.data.label,
          };
          node.class = changesToApply.class;
          //check if its a phase
          if (node.stringType === "phase") {
            node.pType = changesToApply.pType;
            console.log(changesToApply.pType);
          }
          // node.enable = props.changesToApply.enable;
        }

        return node;
      })
    );
    console.log(nodesWithState);
  }, [changesToApply]);

  return (
    <div className="window-conteiner">
      <EditWindow
        setChangesToApply={(changes) => setChangesToApply(changes)}
        nodeInfo={clickedNodeInfo}
        nodesWithState = {nodesWithState}
      />
      <div
        className="flow-conteiner"
        style={{ height: "90vh", width: "200vh" }}
      >
        <Flow
          changesToApply={changesToApply}
          updateNodeId={(nodeId) => setClickedNodeInfo(nodeId)}

          nodesWithState={nodesWithState}
          setNodes={(n) => setNodes(n)}
          onNodesChange = {(n) => onNodesChange(n)}
        />
      </div>
    </div>
  );
}


export default ViewPage;
