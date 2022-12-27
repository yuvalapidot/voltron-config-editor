import React from "react";
import "./ViewPage.scss";
import { useState } from "react";
import EditButton from "./EditButton";

function EditWindow() {
  let [editorStyle, setEditorStyle] = useState(editorStyleClosed);

  return (
    <div style={editorStyle}>
      <EditButton onClick={(newState) => setEditorStyle(newState)} />
    </div>
  );
}

export let editorStyleOpen = {
  height: "90vh",
  width: "80vh",
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "2vh",
  backgroundColor: "white",
  border: "3px solid #f8fafb",
  boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.5)",
};

export let editorStyleClosed = {
  height: "90vh",
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "2vh",
};

export default EditWindow;
