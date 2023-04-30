import React, { useState, useEffect } from "react";
import Flow from "./Flow";
import "./ViewPage.scss";
import EditWindow from "./Edit/EditWindow";
import ReactFlow, { useNodesState, useEdgesState } from "reactflow";
import { nodes } from "../../../elements";

// ViewPage is the parent of Flow and EditWindow so if we change the state of ViewPage - Flow and EditWindow will be rendered as well
function ViewPage() {
  // State 1 - nodesWithState: make the calculated nodes of elements into state
  const [nodesWithState, setNodes, onNodesChange] = useNodesState(nodes);
  // State 2 - clickedNodeInfo: Clicking the graph get the information of the node in the Flow
  let [clickedNodeInfo, setClickedNodeInfo] = useState({
    nodeName: "choose element from the graph",
    id: "0",
  });
  // State 3 - changesToApply: Which changes I want to update for that node in the Edit Window
  let [changesToApply, setChangesToApply] = useState({});

  // When changes are made in Form - keep them updated in changesToApply and then in the UI to dispaly
  useEffect(() => {
    setNodes((nodesWithState) =>
      nodesWithState.map((node) => {
        if (node.id == changesToApply.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          //this new object responsible for editing the step producer
          node.data = {
            ...node.data,
            label: changesToApply.data.label,
          };
          node.class = changesToApply.class;
          //check if its a phase
          if (node.stringType == "phase") {
            node.data.label = changesToApply.data.label
            node.name = changesToApply.data.label
            node.pType = changesToApply.pType;
            //node.selected = changesToApply.enable
            console.log(changesToApply.pType);
          }
          //check if its a pipline
          if (node.stringType == "pipeline") {
            node.type = changesToApply.type;
          }
          // node.enable = props.changesToApply.enable;
        }

        return node;
      })
    );
    //console.log(nodesWithState);
  }, [changesToApply]);

  return (
    <div className="window-conteiner">
      {/* Apply changes to the clicked node */}
      <EditWindow
        setChangesToApply={(changes) => setChangesToApply(changes)}
        nodeInfo={clickedNodeInfo}
        nodesWithState={nodesWithState}
      />
      <div
        className="flow-conteiner"
        style={{ height: "90vh", width: "200vh" }}
      >
        {/* Get the clicked node object from the Flow to apply changes on */}
        <Flow
          changesToApply={changesToApply}
          updateNodeId={(nodeId) => setClickedNodeInfo(nodeId)}
          nodesWithState={nodesWithState}
          setNodes={(n) => setNodes(n)}
          onNodesChange={(n) => onNodesChange(n)}
        />
      </div>
    </div>
  );
}

export default ViewPage;
