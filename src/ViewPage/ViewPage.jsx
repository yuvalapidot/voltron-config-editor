import React from "react";
import Flow from "./Flow";
import "./ViewPage.scss";

function ViewPage() {
  return (
    <div className="flow-conteiner" style={{ height: "70vh", width: "190vh" }}>
      <Flow />
    </div>
  );
}

export default ViewPage;
