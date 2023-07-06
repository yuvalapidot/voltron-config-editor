import yaml from "js-yaml";

// ID variables
let pipelineId = 1; // Pipeline ID counter
let phaseId = 1;    // Phase ID counter
let spId = 1;       // Step producer ID counter

export function yamlToDict(data) 
{
    return yaml.load(data, { schema: yaml.JSON_SCHEMA });
};

export function createElements(data) 
{
    const initialElements = { name: [], common: [], state: [], nodes: [], edges: [] };
    
    // "name" section
    const yamlName = data['name'];
    initialElements['name'].push(yamlName);

    // "common" section
    const yamlCommon = data['common'];
    initialElements['common'].push(yamlCommon);
    
    // "state" section
    const yamlState = data['state'];
    initialElements['state'].push(yamlState);
    
    // "pipeline" section
    const yamlPipelines = data['pipeline'];
    const [pipelines, innerEdges] = createPipelines(yamlPipelines);
    initialElements['nodes'].push(...pipelines);
    initialElements['edges'].push(...innerEdges);
    const edges = createEdges(pipelines);
    initialElements['edges'].push(...edges);
    
    phaseId = 1;
    
    return initialElements;
}
  
// PIPELINES
function createPipelines(yamlPipelines) 
{
    const pipelines = [];
    const innerEdges = [];
    let pipelineNode = {};
    yamlPipelines.forEach(pipeline => {
      pipelineNode["id"] = '' + pipelineId;
      pipelineNode["data"] = pipeline["name"];
      pipelineNode["type"] = pipeline["type"];
      const [phases, edges] = createPhases(pipeline["phases"]);
      pipelineNode["phases"] = phases;
      pipelines.push(pipelineNode);

      if (edges.length !== 0) {
        innerEdges.push(...edges);
      }

      pipelineId += 1;
      phaseId = 1;
      pipelineNode = {};
    });
    return [pipelines, innerEdges];
}
  
// PHASES
function createPhases(yamlPhases) 
{
    const plPhases = [];
    const plInnerEdges = [];
    let phaseNode = {};
    yamlPhases.forEach(phase => {
      phaseNode["id"] = pipelineId + '.' + phaseId;
      phaseNode["parentNode"] = '' + pipelineId;
      phaseNode["data"] = phase["name"];
      phaseNode["type"] = phase["type"];

      if ("enable" in phase) { 
        phaseNode["enable"] = phase["enable"]; 
      }

      if ("thread_count" in phase) { 
        phaseNode["thread_count"] = phase["thread_count"]; 
      }

      const [stepProducers, innerEdges] = createStepProducers(phase["producers"]);
      
      phaseNode["producers"] = stepProducers;
      plPhases.push(phaseNode);
      
      if (innerEdges.length !== 0) {
        plInnerEdges.push(...innerEdges);
      }
      
      phaseId += 1;
      spId = 1;
      phaseNode = {};
    });
    return [plPhases, plInnerEdges];
}
  
// PRODUCERS
function createStepProducers(yamlProducers)
{
    const producers = [];
    const innerEdges = [];
    let producerNode = {};

    yamlProducers.forEach(producer => {
      producerNode["id"] = pipelineId + '.' + phaseId + '.' + spId;
      producerNode["parentNode"] = pipelineId + '.' + phaseId;
      producerNode["data"] = producer["name"];
      producerNode["class"] = producer["class"];
      
      if ("enable" in producer) { 
        producerNode["enable"] = producer["enable"]; 
      }

      if ("parameters" in producer) { 
        producerNode["parameters"] = producer["parameters"]; 
      }
      
      if ("run_after" in producer) {
        producerNode["run_after"] = producer["run_after"];
        const nodeToUpdate = producer["run_after"];
        producers.forEach(psp => {
          if (nodeToUpdate.includes(psp["data"])) {
            innerEdges.push(createInnerEdges(psp["id"], pipelineId + '.' + phaseId + '.' + spId));
          }
        });
      }

      producers.push(producerNode);
      spId += 1;
      producerNode = {};
    });
  
    return [producers, innerEdges];
}
 
// EDGES
function createEdges(pipelines) 
{
    const edges = [];
    let newEdge = {};
    pipelines.forEach(pipeline => {
      const numberOfPhases = pipeline["phases"].length;
      if (numberOfPhases > 1)
      {
        for (let i = 0; i < numberOfPhases - 1; i++) 
        {
          let source = pipeline["phases"][i]["id"];
          let target = pipeline["phases"][i + 1]["id"];
          newEdge["id"] = source + "-" + target;
          newEdge["source"] = source;
          newEdge["target"] = target;
          edges.push(newEdge);
          newEdge = {};
        }
      }

      if (pipeline["type"] === "loop") 
      {
        let source = pipeline["phases"][numberOfPhases - 1]["id"];
        let target = pipeline["phases"][0]["id"];
          
        newEdge["id"] = source + "-" + target;
        newEdge["source"] = source;
        newEdge["target"] = target;
        edges.push(newEdge);
        newEdge = {};
      }
    });
    return edges;
}
  
// INNER EDGES
function createInnerEdges(source, target) 
{
    const newInnerEdge = {};
    newInnerEdge["id"] = "e" + source + "-" + target;
    newInnerEdge["source"] = String(source);
    newInnerEdge["target"] = String(target);
    newInnerEdge["animated"] = true;
    newInnerEdge["zIndex"] = 999;
    return newInnerEdge;
}

export function transformData(data, name, common, state) 
{
  const pipelines = data.filter(item => item.stringType === 'pipeline');
  
  return {
    name: '' + name,
    common: common,
    state: state,
    pipeline: pipelines.map(pipeline => {
      const phases = data.filter(item => item.stringType === 'phase' && item.parentNode === pipeline.id);
      return {
        name: pipeline.data.label,
        type: pipeline.type,
        phases: phases.map(phase => {
          const producers = data.filter(item => item.stringType === 'step_producer' && item.parentNode === phase.id);
          return {
            name: phase.data.label || phase.data,
            type: phase.type,
            ...(phase.enable !== undefined && { enable: phase.enable }),
            ...(phase.thread_count !== undefined && { thread_count: phase.thread_count }),
            producers: producers.map(producer => {
              return {
                class: producer.class,
                name: producer.data.label,
                ...(producer.enable !== undefined && { enable: producer.enable }),
                ...(producer.parameters !== undefined && { parameters: producer.parameters }),
                ...(producer.run_after !== undefined && { run_after: producer.run_after })
              }
            })
          }
        })
      }
    })
  };
}