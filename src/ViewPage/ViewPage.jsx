import React from "react";
import Flow from "./Flow";
import "./ViewPage.scss";
import { Button } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

let editorIsClosed = true;

function ViewPage() {
  let [editorStyle, setEditorStyle] = useState(editorStyleClosed);
  let [buttonText, setButtonText] = useState("Edit");
  let handleClick = () => {
    if (editorIsClosed) {
      setEditorStyle(editorStyleOpen);
      setButtonText(<KeyboardDoubleArrowLeftIcon />);
    } else {
      setEditorStyle(editorStyleClosed);
      setButtonText("Edit");
    }
    editorIsClosed = !editorIsClosed;
  };
  return (
    <div className="window-conteiner">
      <div style={editorStyle}>
        <Button variant="contained" style={buttonStyle} onClick={handleClick}>
          {buttonText}
        </Button>
      </div>
      <div
        className="flow-conteiner"
        style={{ height: "90vh", width: "200vh" }}
      >
        <Flow />
      </div>
    </div>
  );
}

let buttonStyle = {
  alignSelf: "center",
  padding: "1.5em 1em 1.5em 1em",
};

let editorStyleOpen = {
  height: "90vh",
  width: "80vh",
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "2vh",
  backgroundColor: "white",
  border: "3px solid #f8fafb",
  boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.5)",
};

let editorStyleClosed = {
  height: "90vh",
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "2vh",
};

export default ViewPage;
