import { MarkerType } from "reactflow";

let PHASE_HEIGHT = 55 * 5 + 10;

export let nodes = [];
export let edges = [];

export function setNodes(nestedNodes) {
  nodes = calculatePosition(nestedNodes);
  // console.log(nodes);
}

export function setEdges(edgesFromBackend) {
  edges = edgesFromBackend;
  edges.map((edge) => {
    edge.markerEnd = { type: MarkerType.ArrowClosed };
    edge.style = { stroke: "black" };
  });
}

// position calculators:
export function calculatePosition(nestedNodes) {
  // console.log(nestedNodes);
  let nodesAccumulator = [];
  let phasesSpacer = 70;
  let pipelineSpacer = 110;
  let horizonalPosition = 0;
  let verticalPosition = 0;
  let linear = false;
  nestedNodes.forEach((pipeline) => {
    // pipeline is a *dict* contins also the phases list
    //let numberOfPhases = pipeline.phases.length(); // phases is a *list* phases dicts
    // console.log("in pipeline");
    // linear case
    if (pipeline.type === "linear") {
      linear = true;
    }

    let numberOfPhases = Object.keys(pipeline.phases).length; // nunber of phases
    let phaseCounter = 0;
    let even = numberOfPhases % 2 === 0;
    let nextPipeHorizontalPos = 0;
    pipeline.phases.forEach(
      (
        phase // phase is a dict
      ) => {
        // add current phase to nodes list (we need to add it befor it's children for react flow functionality):
        phase.data = { label: phase.data };
        if (linear == true) {
          phase.position = { x: horizonalPosition, y: verticalPosition };
          horizonalPosition += phasesSpacer + 200;
          phase["targetPosition"] = "left";
          phase["sourcePosition"] = "right";
        } else {
          phaseCounter++;
          if (even) {
            if (phaseCounter <= numberOfPhases / 2) {
              verticalPosition = -(PHASE_HEIGHT + 30);
              phase.position = { x: horizonalPosition, y: verticalPosition };
              horizonalPosition += phasesSpacer + 200;
              nextPipeHorizontalPos = horizonalPosition;

              if (phaseCounter === 1) {
                phase["targetPosition"] = "bottom";
                phase["sourcePosition"] = "right";
              } else if (phaseCounter === numberOfPhases / 2) {
                phase["targetPosition"] = "left";
                phase["sourcePosition"] = "bottom";
                horizonalPosition -= phasesSpacer + 200; // for next itteration
              } else {
                phase["targetPosition"] = "left";
                phase["sourcePosition"] = "right";
              }
            } else {
              verticalPosition = PHASE_HEIGHT + 30;
              phase.position = { x: horizonalPosition, y: verticalPosition };
              horizonalPosition -= phasesSpacer + 200;

              if (phaseCounter === numberOfPhases / 2 + 1) {
                phase["targetPosition"] = "top";
                phase["sourcePosition"] = "left";
              }
              if (phaseCounter === numberOfPhases) {
                phase["targetPosition"] = "right";
                phase["sourcePosition"] = "top";
              } else {
                phase["targetPosition"] = "rigth";
                phase["sourcePosition"] = "left";
              }
            }
          }
          horizonalPosition = nextPipeHorizontalPos;
          verticalPosition = 0;
          phaseCounter = 0;
        }

        phase["style"] = {
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          width: 200,
          height: PHASE_HEIGHT, // make it user defined size !
        };

        delete phase["type"];
        nodesAccumulator.push(phase);

        // add the children step-producers:
        let horizonalPositionInPhase = 25; // for step producers
        let verticalPositionInPhase = 40; // for step producers
        let spacerInPhase = 60; // for step producers
        phase.step_producers.forEach((step_producer) => {
          step_producer.data = { label: step_producer.data };
          step_producer.position = {
            x: horizonalPositionInPhase,
            y: verticalPositionInPhase,
          };
          step_producer["style"] = {
            width: 150,
            height: 49,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          };
          step_producer["targetPosition"] = "left";
          step_producer["sourcePosition"] = "bottom";
          // delete step_producer["type"];
          verticalPositionInPhase += spacerInPhase;
          nodesAccumulator.push(step_producer);
        });

        delete phase["step_producers"]; // delete the step producers from current phase (???)
      }
    );
    horizonalPosition += pipelineSpacer;
    verticalPosition = 0;
    linear = false;
  });
  return nodesAccumulator;
}
