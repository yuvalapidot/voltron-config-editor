import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Controls,
  ControlButton
} from 'reactflow';
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import 'reactflow/dist/style.css';

// Define the onSave and onRestore event handlers to save and restore the graph state to/from the local storage
const SaveRestore = (props) => {
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    console.log("props in SaveRestore:")
    console.log(props)
    console.log("typeof setNodes: " + typeof props.setNodes);
    const flowKey = 'example-flow';
    
    //Save Function
    const onSave = useCallback(() => {
      console.log('In save')
      console.log("rfInstance: " + rfInstance)
      if (rfInstance) {
          const flow = rfInstance.toObject();
          console.log('In if of save')
          console.log("flow: \n" + flow)
          localStorage.setItem(flowKey, JSON.stringify(flow));
      }
      }, [rfInstance]);

    //Restore Function
    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));
            console.log('In restore')
            console.log("flow: \n" + flow)
            if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            console.log('In if of restore')
            console.log("typeof setNodes: " + typeof props.setNodes);
            props.setNodes(flow.nodes || []);
            props.setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [props, setViewport]);

    return (
        <div>
        <Controls className="save__controls">
          <ControlButton onClick={onSave} title='Save to local memory'>
            <div><SaveIcon/></div>
          </ControlButton>
          <ControlButton onClick={onRestore} title='Restore from local memory'>
            <div><FileUploadIcon/></div>
          </ControlButton>
        </Controls>
        <ReactFlow
          nodes={props.nodes}
          edges={props.edges}
          onNodesChange={props.onNodesChange}
          onEdgesChange={props.onEdgesChange}
          onConnect={props.onConnect}
          onInit={setRfInstance}
        >
        </ReactFlow>
        </div>
      );
}

//Use ReactFlowProvider as a wrapper to use other React Flow libraries
function SaveRestoreWithProvider(props) {
  return (
    <ReactFlowProvider>
      <SaveRestore {...props} />
    </ReactFlowProvider>
  );
}
export default SaveRestoreWithProvider;