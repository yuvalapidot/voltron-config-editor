import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import StepProducerForm from "./StepProducerForm";
import PhaseForm from "./PhaseForm";
import PipelineForm from "./PipelineForm";

function Form(props) {
  return (
    <div style={{ width: "100%" }}>
      {props.nodeInfo.nodeId === "0" ? (
        "Create a new pipeline"
      ) : props.nodeInfo.nodeId.includes(".") ? (
        <StepProducerForm
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
        />
      ) : props.nodeInfo.nodeId.includes("pl") ? (
        "<PipelineForm />"
      ) : (
        <PhaseForm />
      )}
    </div>
  );
}

export default Form;
