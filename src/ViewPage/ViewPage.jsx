import React from "react";
import Flow from "./Flow";
import "./ViewPage.scss";
import { Button } from "@mui/material";
import { useState } from "react";

function ViewPage() {
  let [editorStyle, setEditorStyle] = useState(editorStyleClosed);
  let editorIsClosed = true;
  let handleClick = () => {
    if (editorIsClosed) {
      setEditorStyle(editorStyleOpen);
    } else {
      setEditorStyle(editorStyleClosed);
    }
    editorIsClosed = !editorIsClosed;
  };
  return (
    <div className="window-conteiner">
      <div style={editorStyle}>
        <Button variant="contained" style={buttonStyle} onClick={handleClick}>
          Edit
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
  padding: "3em 1em 3em 1em",
};

let editorStyleOpen = {
  height: "90vh",
  width: "40vh",
  backgroundColor: "black",
  display: "flex",
  flexDirection: "row-reverse",
};

let editorStyleClosed = {
  height: "90vh",
  backgroundColor: "black",
  display: "flex",
  flexDirection: "row-reverse",
};

export default ViewPage;
