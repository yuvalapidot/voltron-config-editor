import React from "react";
import Flow from "./Flow";
import "./ViewPage.scss";
import EditButton from "./EditButton";
import EditWindow from "./EditWindow";

function ViewPage() {
  return (
    <div className="window-conteiner">
      <EditWindow />
      <div
        className="flow-conteiner"
        style={{ height: "90vh", width: "200vh" }}
      >
        <Flow />
      </div>
    </div>
  );
}

export default ViewPage;
