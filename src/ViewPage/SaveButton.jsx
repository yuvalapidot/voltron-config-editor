import React, { useState } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function SaveButton(props) {
  return (
    <Button variant="outlined" style={buttonStyle}>
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
