import React, { useState } from "react";
import StepProducerForm from "./StepProducerForm";
import PhaseForm from "./PhaseForm";

// 3 types of form: pipeline/step_producer/phase. Show the relevant in the form
function Form(props) {
  // console.log(props.nodeInfo.id);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "auto",
      }}
    >
      {props.nodeInfo.nodeId === "0" ? ( // White canvas
        "Create a new pipeline" // ToDo: complete create new pipeline
      ) : props.nodeInfo.stringType === "step_producer" ? (
        <StepProducerForm
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
        />
      ) : props.nodeInfo.stringType === "pipeline" ? (
        "<PipelineForm />"
      ) : props.nodeInfo.stringType === "phase" ? (
        <PhaseForm
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
        />
      ) : null}
      {/* <SaveButton nodesWithState={props.nodesWithState} /> */}
    </div>
  );
}

export default Form;
