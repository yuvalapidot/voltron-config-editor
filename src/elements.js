import { MarkerType } from "reactflow";

const config = require("./config");

export let nodes = [];
export let edges = [];

export function setNodes(nestedNodes) {
  nodes = calculatePosition(nestedNodes);
  console.log(nodes);
}

export function setEdges(edgesFromBackend) {
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

// position calculators:
export function calculatePosition(nestedNodes) {
  //======= varieables =========
  let nodesAccumulator = [];

  //FOR PIPELINES:
  let horizonalPositionPipe = 0;
  let verticalPositionPipe = 0;
  let PIPELINE_HEIGHT = window.innerHeight * 2 * 0.85;
  let paddingInPipe = 100 * 2; // *2 for each side
  let pipelineWidth = 0;
  let pipelineSpacer = 100;

  //FOR PHASES:
  let PHASE_HEIGHT = 55 * (config.NumOfSP + 1) + 10;
  let phaseWidth = 200;
  let spacer = 300;
  let horizonalPosition = 100;
  let verticalPosition = PIPELINE_HEIGHT / 2 - PHASE_HEIGHT / 2;
  let verticalPosition_identUp = verticalPosition + PHASE_HEIGHT;
  let verticalPosition_identDown = verticalPosition - PHASE_HEIGHT;
  let phaseCounter = 1;

  //FOR STEP PRODUCERS:
  let horizonalPositionInPhase = 25;
  let verticalPositionInPhase = 40;
  let spacerInPhase = 60;

  //============================

  let createStepProducer = (step_producer) => {
    step_producer.data = { label: step_producer.data };
    step_producer.position = {
      x: horizonalPositionInPhase,
      y: verticalPositionInPhase,
    };
    step_producer["style"] = {
      width: 150,
      height: 49,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
    };
    step_producer["targetPosition"] = "left";
    step_producer["sourcePosition"] = "bottom";
    // delete step_producer["type"];
    verticalPositionInPhase += spacerInPhase;
    nodesAccumulator.push(step_producer);
  };
  
  let getBorder = (phaseType) => {
    console.log(phaseType)
    if (phaseType === 'blocking'){
      return "2px solid"
    }
    else if (phaseType === 'watchdog'){
      return "2px dashed"
    }
    else{
      return "2px solid #949494"
    }
    // return "3px solid"
  }
  nestedNodes.forEach((pipeline) => {
    // pipeline is a dict contins also the phases list
    //let numberOfPhases = pipeline.phases.length(); // phases is a list phases dicts
    console.log("in pipeline");
    let numberOfPhases = Object.keys(pipeline.phases).length;
    pipeline.data = { label: pipeline.data };
    pipeline.position = { x: horizonalPositionPipe, y: verticalPositionPipe };
    pipeline.draggable = false;

    // liniar case
    if (pipeline.type === "linear") {
      pipelineWidth =
        numberOfPhases * phaseWidth +
        (numberOfPhases - 1) * 100 +
        paddingInPipe;
      pipeline["style"] = {
        backgroundColor: "rgba(207, 207, 207, 0.1)",
        width: pipelineWidth,
        // width: h,
        height: PIPELINE_HEIGHT,
      };
      nodesAccumulator.push(pipeline);

      pipeline.phases.forEach(
        (
          phase // phase is a dict
        ) => {
          // add current phase to nodes list (we need to add it befor it's children for react flow functionality):
          phase.data = { label: phase.data + ' - ' + phase.pType};
          phase.position = { x: horizonalPosition, y: verticalPosition };
          horizonalPosition += spacer;
          //defining the target and source positions
          phase["targetPosition"] = "left";
          phase["sourcePosition"] = "right";
          let border = getBorder(phase.pType);
          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: PHASE_HEIGHT,
            border: border,
          };
          // delete phase["type"];
          nodesAccumulator.push(phase);

          // add the children step-producers:

          phase.step_producers.forEach(createStepProducer);

          delete phase["step_producers"]; // delete the step producers from current phase (???)
          horizonalPositionInPhase = 25;
          verticalPositionInPhase = 40;
        }
      );
      // horizonalPosition += spacer;
      horizonalPosition = 100;
      // verticalPosition = 0;
    }
    // loop case
    else {
      // let numberOfPhases = Object.keys(pipeline.phases).length;
      let evenCase = numberOfPhases % 2 === 0;

      // if (evenCase){
      //   pipeline["style"] = {
      //   backgroundColor: "rgba(255, 0, 0, 0.2)",
      //   width: (numberOfPhases/2)*200+400,
      //   height: PIPELINE_HEIGHT,
      // };
      // }

      pipeline.phases.forEach(
        (
          phase // phase is a dict
        ) => {
          if (evenCase) {
            pipelineWidth =
              (numberOfPhases / 2) * phaseWidth +
              (numberOfPhases / 2 - 1) * 100 +
              paddingInPipe;
            pipeline["style"] = {
              backgroundColor: "rgba(207, 207, 207, 0.1)",
              width: pipelineWidth,
              height: PIPELINE_HEIGHT,
            };
            nodesAccumulator.push(pipeline);

            if (phaseCounter <= numberOfPhases / 2) {
              phase.position = {
                x: horizonalPosition,
                y: verticalPosition_identDown,
              };
              horizonalPosition += spacer;
            } else {
              horizonalPosition -= spacer;
              phase.position = {
                x: horizonalPosition,
                y: verticalPosition_identUp,
              };
            }

            if (phaseCounter === 1) {
              phase["sourcePosition"] = "right";
              phase["targetPosition"] = "bottom";
            } else if (phaseCounter === numberOfPhases / 2) {
              phase["sourcePosition"] = "bottom";
              phase["targetPosition"] = "left";
            } else if (phaseCounter === numberOfPhases / 2 + 1) {
              phase["sourcePosition"] = "left";
              phase["targetPosition"] = "top";
            } else if (phaseCounter === numberOfPhases) {
              phase["sourcePosition"] = "top";
              phase["targetPosition"] = "right";
            } else if (phaseCounter < numberOfPhases / 2) {
              // top line
              phase["sourcePosition"] = "right";
              phase["targetPosition"] = "left";
            } else {
              // bottom line
              phase["sourcePosition"] = "left";
              phase["targetPosition"] = "right";
            }

            phaseCounter += 1;
          } else {
            // odd case
            pipelineWidth =
              (numberOfPhases / 2 + 0.5) * phaseWidth +
              (numberOfPhases / 2 - 0.5) * 100 +
              paddingInPipe;
            pipeline["style"] = {
              backgroundColor: "rgba(207, 207, 207, 0.1)",
              width: pipelineWidth,
              height: PIPELINE_HEIGHT,
            };
            nodesAccumulator.push(pipeline);

            if (phaseCounter < numberOfPhases / 2) {
              phase.position = {
                x: horizonalPosition,
                y: verticalPosition_identDown,
              };
              horizonalPosition += spacer;
            } else if (phaseCounter > Math.ceil(numberOfPhases / 2)) {
              horizonalPosition -= spacer;
              phase.position = {
                x: horizonalPosition,
                y: verticalPosition_identUp,
              };
            } else {
              phase.position = {
                x: horizonalPosition,
                y: verticalPosition,
              };
              //horizonalPosition += spacer;
            }
            if (phaseCounter === 1) {
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

          // add current phase to nodes list (we need to add it befor it's children for react flow functionality):
          phase.data = { label: phase.data + ' - ' + phase.pType };
          let border = getBorder(phase.pType);
          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: PHASE_HEIGHT,
            border: border,
          };
          // delete phase["type"];
          nodesAccumulator.push(phase);

          // add the children step-producers:

          phase.step_producers.forEach(createStepProducer);

          delete phase["step_producers"]; // delete the step producers from current phase (???)
          horizonalPositionInPhase = 25;
          verticalPositionInPhase = 40;
        }
      );
      // horizonalPosition =
      //   horizonalPosition + spacer * (numberOfPhases / 2) + spacer;
      horizonalPosition = 100;
      phaseCounter = 0;
    }
    delete pipeline["type"];
    delete pipeline["phases"];
    horizonalPositionPipe += pipelineWidth + pipelineSpacer;
  });
  return nodesAccumulator;
}
