export let nodes = [];
export let edges = [];

export function setNodes(nestedNodes) {
  nodes = calculatePosition(nestedNodes);
  console.log(nodes);
}

export function setEdges(edgesFromBackend) {
  edges = edgesFromBackend;
}

// position calculators:
export function calculatePosition(nestedNodes) {
  console.log(nestedNodes);
  let nodesAccumulator = [];
  let spacer = 300;
  let horizonalPosition = 0;
  let verticalPosition = 0;
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
          // add current phase to nodes list (we need to add it befor it's children for react flow functionality):
          phase.data = { label: phase.data };
          phase.position = { x: horizonalPosition, y: verticalPosition };
          horizonalPosition += spacer;
          phase["style"] = {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: 200,
            height: 200,
          };
          // delete phase["type"];
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
            // delete step_producer["type"];
            verticalPositionInPhase += spacerInPhase;
            nodesAccumulator.push(step_producer);
          });

          delete phase["step_producers"]; // delete the step producers from current phase (???)
        }
      );
      horizonalPosition = 0;
      verticalPosition += spacer;
    }
    // loop case
    // else {
    //    pipeline.phases.forEach(
    //   (
    //     phase // phase is a dict
    //   ) => {
    //     // add current phase to nodes list (we need to add it befor it's children for react flow functionality):
    //     phase.data = { label: phase.data };
    //     phase.position = { x: horizonalPosition, y: verticalPosition };
    //     horizonalPosition += spacer;
    //     phase["style"] = {
    //       backgroundColor: "rgba(255, 0, 0, 0.2)",
    //       width: 200,
    //       height: 200,
    //     };
    //     // delete phase["type"];
    //     nodesAccumulator.push(phase);

    //     // add the children step-producers:
    //     let horizonalPositionInPhase = 25; // for step producers
    //     let verticalPositionInPhase = 40; // for step producers
    //     let spacerInPhase = 60; // for step producers
    //     phase.step_producers.forEach((step_producer) => {
    //       step_producer.data = { label: step_producer.data };
    //       step_producer.position = {
    //         x: horizonalPositionInPhase,
    //         y: verticalPositionInPhase,
    //       };
    //       // delete step_producer["type"];
    //       verticalPositionInPhase += spacerInPhase;
    //       nodesAccumulator.push(step_producer);
    //     });

    //     delete phase["step_producers"]; // delete the step producers from current phase (???)
    //   }
    // );
    // horizonalPosition = 0;
    // verticalPosition += spacer;
    //       }
    //     }
    //   );
    // }
  });
  return nodesAccumulator;
}

// position calculators:

// export function flatten(nested_pl) {
//   let flat_list = [];
//   nested_pl.forEach((pl) => {
//     let phases = pl.phases;
//     phases.forEach((phase) => {
//       let step_producers = phase.step_producers;
//       let copy = phase;
//       delete copy["step_producers"];
//       flat_list.push(copy);
//       step_producers.forEach((sp) => {
//         flat_list.push(sp);
//       });
//     });
//   });
//   // console.log(flat_list)
//   return flat_list;
// }

// use after react flow process the nodes and detect children size!
export function updateParentSize(nds) {
  let parentIndex = 0;
  let nodeIndex = 1;
  let parentHeight = 40;
  while (nodeIndex < nodesCopy.length) {
    //means its a step-producer
    if ("parentNode" in nodesCopy[nodeIndex]) {
      parentHeight = parentHeight + nodesCopy[nodeIndex].height + 200;
      nodeIndex++;
    } else {
      nodesCopy[parentIndex]["height"] = parentHeight;
      parentIndex = nodeIndex;
      nodeIndex++;
      parentHeight = 40;
    }
  }
  console.log("in updateParentSize");
  console.log(nodesCopy);
  return nodesCopy;
}
