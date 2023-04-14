import React, { useState } from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { editorStyleOpen, editorStyleClosed } from "./EditWindow";
import EditIcon from '@mui/icons-material/Edit';

let editorIsClosed = true;

function EditButton(props) {
  let [buttonText, setButtonText] = useState("Edit");

  let handleClick = () => {
    if (editorIsClosed) {
      props.onClick(editorStyleOpen);
      setButtonText(<KeyboardDoubleArrowLeftIcon />);
    } else {
      props.onClick(editorStyleClosed);
      setButtonText("Edit");
    }
    editorIsClosed = !editorIsClosed;
  };

  return (
    <Button variant="contained" style={buttonStyle} onClick={handleClick}>
      {buttonText}<EditIcon/>
    </Button>
  );
}

let buttonStyle = {
  alignSelf: "center",
  padding: "1.5em 1em 1.5em 1em",
};

export default EditButton;
