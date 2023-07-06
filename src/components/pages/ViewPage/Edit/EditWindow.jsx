import React from "react";
import "../ViewPage.scss";
import { useState } from "react";
import EditButton from "./EditButton";
import Form from "./Form/Form";

function EditWindow(props) 
{
  let [editorStyle, setEditorStyle] = useState(editorStyleClosed);

  return (
    <div style={editorStyle} className="hide-scrollbar">
      <EditButton onClick={(newState) => setEditorStyle(newState)} />
      {/* If editor window is open show me the clickedNode info and the changesToApply */}
      {editorStyle === editorStyleOpen ? (
        <Form
          nodeInfo={props.nodeInfo}
          setChangesToApply={(changes) => props.setChangesToApply(changes)}
          nodesWithState={props.nodesWithState}
        />
      ) : null}
    </div>
  );
}

export let editorStyleOpen = {
  height: "90vh",
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "1vh",
  backgroundColor: "white",
  border: "3px solid #f8fafb",
  boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.5)",
  overflow: "scroll",
  minWidth: "50vh", // Set a minimum width to ensure the window is at least this wide
  maxWidth: "80vh", // Set a maximum width to avoid exceeding the container
  scrollbarWidth: "none",
};

export let editorStyleClosed = {
  height: "90vh",
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "1vh",
};

export default EditWindow;