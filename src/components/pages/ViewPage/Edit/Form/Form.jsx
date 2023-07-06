import React from "react";
import StepProducerForm from "./StepProducerForm";
import PhaseForm from "./PhaseForm";
import PipelineForm from "./PipelineForm";

// 3 types of form: pipeline/step_producer/phase. Show the relevant in the form
function Form(props) 
{
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {props.nodeInfo.nodeId === "0" ? ( // White canvas
        "Create a new pipeline" // ToDo: complete create new pipeline
      ) : props.nodeInfo.stringType === "pipeline" ? (
        <PipelineForm
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
        />
      ) : props.nodeInfo.stringType === "phase" ? (
        <PhaseForm
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
        />
      ) : props.nodeInfo.stringType === "step_producer" ? (
        <StepProducerForm
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
        />
      ) : null}
   
      {/* <SaveButton nodesWithState={props.nodesWithState} /> */}
    </div>
  );
}

export default Form;
