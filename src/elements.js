export let nodes = [];
export let edges = [];

// position calculators:



export function flatten(nested_pl){
    let flat_list = [];
    nested_pl.forEach(pl => {
        let phases = pl.phases;
        phases.forEach(phase => {
            let step_producers = phase.step_producers;
            let copy = phase;
            delete copy['step_producers']
            flat_list.push(copy);
            step_producers.forEach(sp => {
                flat_list.push(sp);
            })
        })
    });
    // console.log(flat_list)
    return flat_list;
}


