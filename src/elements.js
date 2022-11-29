export let nodes = [];
export let edges = [];

export function setNodes(nestedNodes) {
  nodes = calculatePosition(nestedNodes);
}

// position calculators:
export function calculatePosition(nestedNodes) {
  let nodesAccumulator = [];
  let spacer = 30;
  let horizonalPosition = 0;
  let verticalPosition = 0;
  console.log(nestedNodes);
  nestedNodes.forEach((pipeline) => {
    // pipeline is a *dict* contins also the phases list
    //let numberOfPhases = pipeline.phases.length(); // phases is a *list* phases dicts
    console.log("in pipeline");
    // liniar case
    if (pipeline.type === "linear") {
      pipeline.phases.forEach(
        (
          phase // phase is a dict
        ) => {
          console.log("phase");
          phase.position = { x: horizonalPosition, y: verticalPosition };
          horizonalPosition += spacer;
          nodesAccumulator.push(phase);
        }
      );
    }
    // loop case
    // else {
    //   let numberOfPhasesWihPosition = 0;
    //   pipeline.phases.forEach(
    //     (
    //       phase // phase is a dict
    //     ) => {
    //       phase[position] = { x: horizonalPosition, y: verticalPosition };
    //       numberOfPhasesWihPosition++;
    //       horizonalPosition += spacer;
    //       if (numberOfPhasesWihPosition >= numberOfPhases / 2) {
    //         verticalPosition -= spacer;
    //         horizonalPosition -= spacer;
    //       }
    //     }
    //   );
    // }
  });
  nodes = nodesAccumulator;
  console.log(nodes);
}
