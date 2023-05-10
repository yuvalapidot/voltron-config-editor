import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define the onSave and onRestore event handlers to save and restore the graph state to/from the local storage
const SaveRestore = (props) => {
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    console.log(typeof props.setNodes);
    const flowKey = 'example-flow';
    const onSave = useCallback(() => {
    console.log('In save')
    console.log(rfInstance)
    if (rfInstance) {
        const flow = rfInstance.toObject();
        console.log('In if of save')
        console.log(flow)
        localStorage.setItem(flowKey, JSON.stringify(flow));
    }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));
            console.log('In restore')
            console.log(flow)
            if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            console.log('In if of restore')
            console.log(typeof props.setNodes);
            props.setNodes(flow.nodes || []);
            props.setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [props.setNodes, setViewport]);

    return (
        <div>
        <Controls className="save__controls">
            <button onClick={onSave}>Save</button>
            <button onClick={onRestore}>Restore</button>
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

export default () => (
    <ReactFlowProvider>
      <SaveRestore />
    </ReactFlowProvider>
  );