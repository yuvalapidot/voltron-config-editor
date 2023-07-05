import { MarkerType } from "reactflow";

const config = require("./config");

export let yamlName = [];
export let common = [];
export let states = [];
export let nodes = [];
export let edges = [];
export let nodesToBackend = []; // this version is nested and will be updated according to the ui changes
export let updatedYaml = [];

export function setName(nameFromBackend)
{
  yamlName = nameFromBackend;
}

export function setCommon(commonFromBackend)
{
  common = commonFromBackend;
}

export function setState(stateFromBackend)
{
  states = stateFromBackend;
}

export function setNodes(nestedNodes) 
{
  nodesToBackend = JSON.parse(JSON.stringify(nestedNodes));
  updatedYaml = nodesToBackend;
  nodes = calculatePosition(nestedNodes);
  console.log(nodes);
}

// Decorate edges in the UI
export function setEdges(edgesFromBackend) 
{
  edges = edgesFromBackend;
  edges.map((edge) => {
    edge.markerEnd = {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "black",
    };
    edge.style = { stroke: "black" };
  });
}

// Position calculators for the objects based on the object amount etc. Flaten the data from the file
export function calculatePosition(nestedNodes) 
{
  //======= varieables =========
  let nodesAccumulator = [];

  // FOR PIPELINES:
  let horizonalPositionPipe = 0;
  let verticalPositionPipe = 0;
  let PIPELINE_HEIGHT = window.innerHeight * 2 * 0.85;
  let paddingInPipe = 100 * 2; // *2 for each side
  let pipelineWidth = 0;
  let pipelineSpacer = 100;

  // FOR PHASES:
  let PHASE_HEIGHT = 55 * (config.NumOfSP + 1) + 10;
  let phaseWidth = 200;
  let spacer = 300;
  let horizonalPosition = 100;
  let verticalPosition = PIPELINE_HEIGHT / 2 - PHASE_HEIGHT / 2;
  let verticalPosition_identUp = verticalPosition + PHASE_HEIGHT;
  let verticalPosition_identDown = verticalPosition - PHASE_HEIGHT;
  let phaseCounter = 1;

  // FOR STEP PRODUCERS:
  let horizonalPositionInPhase = 25;
  let verticalPositionInPhase = 40;
  let spacerInPhase = 60;

  // Calculate the location in the UI of every step producer and its nodes + edges.
  // Convert information of every step producer and its nodes + edges from YAML to the UI objects.

  let createStepProducer = (step_producer) => {

    step_producer.stringType = "step_producer";

    step_producer.data = { label: step_producer.data };

    step_producer.position = { x: horizonalPositionInPhase, y: verticalPositionInPhase };

    step_producer["style"] = 
    {
      width: 150,
      height: 49,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
    };

    step_producer["targetPosition"] = "left"; // Source - From where the edge is coming out
    step_producer["sourcePosition"] = "bottom"; // Target - To where the edge is heading
    // delete step_producer["type"];
    verticalPositionInPhase += spacerInPhase;
    nodesAccumulator.push(step_producer);
  };

  let getBorder = (phaseType) => 
  {
    if (phaseType === "blocking") { return "2px solid"; } 
    else if (phaseType === "watchdog") { return "2px dashed"; } 
    else { return "2px solid #949494"; }
  };

  nestedNodes.forEach((pipeline) => 
  {
    // pipeline is a dict contins also the phases list
    let numberOfPhases = Object.keys(pipeline.phases).length; // phases is a list phases dicts

    pipeline.stringType = "pipeline";

    pipeline.data = { label: pipeline.data };
    pipeline.position = { x: horizonalPositionPipe, y: verticalPositionPipe };
    pipeline.draggable = false;

    // linear Case
    if (pipeline.type === "linear") 
    {
      pipelineWidth = numberOfPhases * phaseWidth + (numberOfPhases - 1) * 100 + paddingInPipe;
      pipeline["style"] = 
      {
        backgroundColor: "rgba(207, 207, 207, 0.1)",
        width: pipelineWidth,
        height: PIPELINE_HEIGHT,
      };
      nodesAccumulator.push(pipeline);

      pipeline.phases.forEach((phase) => 
      {
          // Add current phase to nodes list 
          // (we need to add it before it's children for react flow functionality)
          phase.data = { label: phase.data };
          // phase.name = phase.data;
          phase.stringType = "phase";
          phase.position = { x: horizonalPosition, y: verticalPosition };
          horizonalPosition += spacer;

          // defining the target and source positions
          phase["targetPosition"] = "left";
          phase["sourcePosition"] = "right";
          let border = getBorder(phase.type);
          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: PHASE_HEIGHT,
            border: border,
          };
          // delete phase["type"];
          nodesAccumulator.push(phase);

          // add the children step-producers:
          phase.producers.forEach(createStepProducer);

          delete phase["producers"]; // delete the step producers from current phase (???)
          horizonalPositionInPhase = 25;
          verticalPositionInPhase = 40;
        }
      );
      horizonalPosition = 100;
    }

    // loop case
    if (pipeline.type === "loop") 
    {
      let evenCase = numberOfPhases % 2 === 0;
      let oddCase = numberOfPhases % 2 !== 0;

      pipeline.phases.forEach((phase) => 
      {
        if (evenCase) 
        {
          pipelineWidth = (numberOfPhases / 2) * phaseWidth + (numberOfPhases / 2 - 1) * 100 + paddingInPipe;
          pipeline["style"] = 
          {
            backgroundColor: "rgba(207, 207, 207, 0.1)",
            width: pipelineWidth,
            height: PIPELINE_HEIGHT,
          };
          nodesAccumulator.push(pipeline);

          if (phaseCounter <= numberOfPhases / 2) 
          {
            phase.position = { x: horizonalPosition, y: verticalPosition_identDown };
            horizonalPosition += spacer;
          } 
          
          else 
          {
            horizonalPosition -= spacer;
            phase.position = { x: horizonalPosition, y: verticalPosition_identUp };
          }

          if (phaseCounter === 1) 
          {
            phase["sourcePosition"] = "right";
            phase["targetPosition"] = "bottom";
          } 
          
          else if (phaseCounter === numberOfPhases / 2) 
          {
            phase["sourcePosition"] = "bottom";
            phase["targetPosition"] = "left";
          } 
          
          else if (phaseCounter === numberOfPhases / 2 + 1) 
          {
            phase["sourcePosition"] = "left";
            phase["targetPosition"] = "top";
          } 
          
          else if (phaseCounter === numberOfPhases) 
          {
            phase["sourcePosition"] = "top";
            phase["targetPosition"] = "right";
          } 
          
          else if (phaseCounter < numberOfPhases / 2) 
          {
            // top line
            phase["sourcePosition"] = "right";
            phase["targetPosition"] = "left";
          } 
          
          else 
          {
            // bottom line
            phase["sourcePosition"] = "left";
            phase["targetPosition"] = "right";
          }

          phaseCounter += 1;
        } 
          
        if (oddCase) 
        {
          pipelineWidth = (numberOfPhases / 2 + 0.5) * phaseWidth + (numberOfPhases / 2 - 0.5) * 100 + paddingInPipe;
          pipeline["style"] = 
          {
            backgroundColor: "rgba(207, 207, 207, 0.1)",
            width: pipelineWidth,
            height: PIPELINE_HEIGHT,
          };
          nodesAccumulator.push(pipeline);

          if (phaseCounter < numberOfPhases / 2) 
          {
            phase.position = { x: horizonalPosition, y: verticalPosition_identDown };
            horizonalPosition += spacer;
          } 
            
          else if (phaseCounter > Math.ceil(numberOfPhases / 2)) 
          {
            horizonalPosition -= spacer;
            phase.position = { x: horizonalPosition, y: verticalPosition_identUp };
          } 
          
          else 
          {
            phase.position = { x: horizonalPosition, y: verticalPosition };
            //horizonalPosition += spacer;
          }

          if (phaseCounter === 1) 
          {
            phase["sourcePosition"] = "right";
            phase["targetPosition"] = "bottom";
          } else if (phaseCounter < numberOfPhases / 2) {
            // top line
            phase["sourcePosition"] = "right";
            phase["targetPosition"] = "left";
          } else if (phaseCounter === Math.ceil(numberOfPhases / 2)) {
            phase["sourcePosition"] = "bottom";
            phase["targetPosition"] = "top";
          } else if (phaseCounter === numberOfPhases) {
            phase["sourcePosition"] = "top";
            phase["targetPosition"] = "right";
          } else {
            // bottom line
            phase["sourcePosition"] = "left";
            phase["targetPosition"] = "right";
          }

          phaseCounter += 1;
        }

          // add current phase to nodes list (we need to add it before it's children for react flow functionality):
          phase.name = phase.data;
          phase.stringType = "phase";
          let border = getBorder(phase.type);
          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: PHASE_HEIGHT,
            border: border,
          };
          // delete phase["type"];
          nodesAccumulator.push(phase);

          // add the children step-producers:

          phase.producers.forEach(createStepProducer);

          delete phase["producers"]; // delete the step producers from current phase (???)
          horizonalPositionInPhase = 25;
          verticalPositionInPhase = 40;
        }
      );
      horizonalPosition = 100;
      phaseCounter = 0;
    }
    //delete pipeline["type"];
    delete pipeline["phases"];
    horizonalPositionPipe += pipelineWidth + pipelineSpacer;
  });
  return nodesAccumulator;
}
