import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Controls,
  ControlButton,
} from "reactflow";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "reactflow/dist/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the onSave and onRestore event handlers to save and restore the graph state to/from the local storage
const SaveRestore = (props) => {
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const flowKey = "example-flow";

  //Save Function
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      toast.success("Saved Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } else {
      toast.error("Save Failed.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  }, [rfInstance]);

  //Restore Function
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        props.setNodes(flow.nodes || []);
        props.setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        toast.success("Restored Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      } else {
        toast.error("Restore Failed. Nothing in localStorage", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    };

    restoreFlow();
  }, [props, setViewport]);

  // useEffect(() => {
  //   onSave();
  // }, [props.nodes, props.edges, onSave]);

  return (
    <div>
      <Controls className="save__controls">
        <ControlButton onClick={onSave} title="Save to local memory">
          <div>
            <SaveIcon />
          </div>
        </ControlButton>
        <ControlButton onClick={onRestore} title="Restore from local memory">
          <div>
            <FileUploadIcon />
          </div>
        </ControlButton>
      </Controls>
      <ReactFlow
        nodes={props.nodes}
        edges={props.edges}
        onNodesChange={props.onNodesChange}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
        onInit={setRfInstance}
      ></ReactFlow>
    </div>
  );
};

//Use ReactFlowProvider as a wrapper to use other React Flow libraries
function SaveRestoreWithProvider(props) {
  return (
    <ReactFlowProvider>
      <SaveRestore {...props} />
    </ReactFlowProvider>
  );
}
export default SaveRestoreWithProvider;
