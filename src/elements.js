export let nodes = [];
export let edges = [];

export function setNodes(nestedNodes) {
  nodes = calculatePosition(nestedNodes);
}

export function setEdges(edgesFromBackend) {
  edges = edgesFromBackend;
  console.log(edges);
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
          nodes.push(phase);
        }
      );
      horizonalPosition = 0;
      verticalPosition += spacer;
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
  console.log(nodes);
  return;
}

// position calculators:

export function flatten(nested_pl) {
  let flat_list = [];
  nested_pl.forEach((pl) => {
    let phases = pl.phases;
    phases.forEach((phase) => {
      let step_producers = phase.step_producers;
      let copy = phase;
      delete copy["step_producers"];
      flat_list.push(copy);
      step_producers.forEach((sp) => {
        flat_list.push(sp);
      });
    });
  });
  // console.log(flat_list)
  return flat_list;
}
