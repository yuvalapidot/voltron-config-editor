import { MarkerType } from "reactflow";
const config = require('./config');
const num_of_sp = config.NumOfSP;
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

  //FOR FHASES:
  let PHASE_HEIGHT = 55 * (num_of_sp + 1) + 10;
  let spacer = 300;
  let horizonalPosition = 0;
  let verticalPosition = 0;
  let verticalPosition_identUp = 55 * 5 + 10;
  let verticalPosition_identDown = -verticalPosition_identUp;
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

  nestedNodes.forEach((pipeline) => {
    // pipeline is a dict contins also the phases list
    //let numberOfPhases = pipeline.phases.length(); // phases is a list phases dicts
    console.log("in pipeline");
    // liniar case
    if (pipeline.type === "linear") {
      pipeline.phases.forEach(
        (
          phase // phase is a dict
        ) => {
          // add current phase to nodes list (we need to add it befor it's children for react flow functionality):
          phase.data = { label: phase.data };
          phase.position = { x: horizonalPosition, y: verticalPosition };
          horizonalPosition += spacer;
          //defining the target and source positions
          phase["targetPosition"] = "left";
          phase["sourcePosition"] = "right";

          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: PHASE_HEIGHT,
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
      horizonalPosition += spacer;
      verticalPosition = 0;
    }
    // loop case
    else {
      let numberOfPhases = Object.keys(pipeline.phases).length;
      let evenCase = numberOfPhases % 2 === 0;

      pipeline.phases.forEach(
        (
          phase // phase is a dict
        ) => {
          if (evenCase) {
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
          phase.data = { label: phase.data };
          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: PHASE_HEIGHT,
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
      horizonalPosition =
        horizonalPosition + spacer * (numberOfPhases / 2) + spacer;
      phaseCounter = 0;
    }
  });
  return nodesAccumulator;
}
