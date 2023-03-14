import React, { useState } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function SaveButton(props) {
  console.log("from SaveButton: ")
  console.log(props.nodesWithState)
  return (
    <Button variant="outlined" style={buttonStyle} 
    onClick={()=>{console.log("from SaveButton: ")
    console.log(props.nodesWithState)}}>
      Save
      <SaveIcon />
    </Button>
  );
}

let buttonStyle = {
  alignSelf: "center",
  marginBottom: "2vh",
};

export default SaveButton;
