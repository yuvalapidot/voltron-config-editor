import React, { useState } from "react";
import Flow from "./Flow";
import "./ViewPage.scss";
import EditWindow from "./EditWindow";

function ViewPage() {
  let [clickedNodeInfo, setClickedNodeInfo] = useState({
    nodeName: "choose a step-producer",
    nodeId: "0",
  });
  let [changesToApply, setChangesToApply] = useState({});

  return (
    <div className="window-conteiner">
      <EditWindow
        setChangesToApply={(changes) => setChangesToApply(changes)}
        nodeInfo={clickedNodeInfo}
      />
      <div
        className="flow-conteiner"
        style={{ height: "90vh", width: "200vh" }}
      >
        <Flow
          changesToApply={changesToApply}
          updateNodeId={(nodeId) => setClickedNodeInfo(nodeId)}
        />
      </div>
    </div>
  );
}

export default ViewPage;
