import yaml from "js-yaml";

// ID variables
let pipelineId = 1; // Pipeline ID counter
let phaseId = 1;    // Phase ID counter
let spId = 0.1;     // Step producer ID counter

export function yamlToDict(data) {
    return yaml.load(data, { schema: yaml.JSON_SCHEMA });
  };

export function createElements(data) {
    const initialElements = { nodes: [], edges: [] };
    const yamlPipelines = data['pipeline'];
    const [pipelines, innerEdges] = createPipelines(yamlPipelines);
    initialElements['nodes'].push(...pipelines);
    initialElements['edges'].push(...innerEdges);
    const edges = createEdges(pipelines);
    initialElements['edges'].push(...edges);
    phaseId = 1;
    return initialElements;
  }
  
  function createPipelines(yamlPipelines) {
    const pipelines = [];
    const innerEdges = [];
    let newPl = {};
    yamlPipelines.forEach(pipeline => {
      const idStr = "pl-" + pipelineId;
      newPl["id"] = idStr;
      newPl["data"] = pipeline["name"];
      newPl["type"] = pipeline["type"];
      const [phases, edges] = createPhases(pipeline["phases"], pipeline["type"]);
      newPl["phases"] = phases;
      pipelines.push(newPl);
      if (edges.length !== 0) {
        innerEdges.push(...edges);
      }
      newPl = {};
      pipelineId += 1;
    });
    return [pipelines, innerEdges];
  }
  
  function createPhases(yamlPhases, type) {
    const plPhases = [];
    const plInnerEdges = [];
    let phaseNode = {};
    yamlPhases.forEach(phase => {
      const idStr = String(phaseId);
      phaseNode["id"] = idStr;
      phaseNode["data"] = phase["name"];
      phaseNode["pType"] = phase["type"];
      if ("enable" in phase) {
        phaseNode["enable"] = phase["enable"];
      }
      if ("thread_count" in phase) {
        phaseNode["thread_count"] = phase["thread_count"];
      }
      phaseNode["parentNode"] = "pl-" + pipelineId;
      phaseNode["extent"] = "parent";
  
      const [stepProducers, innerEdges] = createStepProducers(phase["producers"]);
  
      phaseNode["step_producers"] = stepProducers;
      plPhases.push(phaseNode);
      if (innerEdges.length !== 0) {
        plInnerEdges.push(...innerEdges);
      }
      phaseId += 1;
      spId = 0.1;
      phaseNode = {};
    });
    return [plPhases, plInnerEdges];
  }
  
  function createStepProducers(producersList) {
    const phaseStepProducers = [];
    const innerEdges = [];
    let producerNode = {};
    producersList.forEach(sp => {
      const newId = phaseId + spId;
      producerNode["id"] = String(newId);
      producerNode["data"] = sp["name"];
      producerNode["class"] = sp["class"];
      if ("enable" in sp) {
        producerNode["enable"] = sp["enable"];
      }
      if ("parameters" in sp) {
        producerNode["parameters"] = sp["parameters"];
      }
  
      producerNode["parentNode"] = String(phaseId);
      producerNode["extent"] = "parent";
  
      if ("run_after" in sp) {
        const nodeToUpdate = sp["run_after"];
        phaseStepProducers.forEach(psp => {
          if (nodeToUpdate.includes(psp["data"])) {
            innerEdges.push(createInnerEdges(psp["id"], newId));
          }
        });
      }
  
      phaseStepProducers.push(producerNode);
      spId += 0.1;
      producerNode = {};
    });
  
    return [phaseStepProducers, innerEdges];
  }
  
  function createEdges(pipelines) {
    const edges = [];
    let newEdge = {};
    pipelines.forEach(pipeline => {
      if (pipeline["phases"].length > 1) {
        for (let i = 0; i < pipeline["phases"].length - 1; i++) {
          newEdge["id"] = "e" + pipeline["phases"][i]["id"] + "-" + pipeline["phases"][i + 1]["id"];
          newEdge["source"] = pipeline["phases"][i]["id"];
          newEdge["target"] = pipeline["phases"][i + 1]["id"];
          edges.push(newEdge);
          newEdge = {};
        }
      }
      if (pipeline["type"] === "loop") {
        newEdge["id"] = "e" + pipeline["phases"][0]["id"] + "-" + pipeline["phases"][pipeline["phases"].length - 1]["id"];
        newEdge["target"] = pipeline["phases"][0]["id"];
        newEdge["source"] = pipeline["phases"][pipeline["phases"].length - 1]["id"];
        edges.push(newEdge);
        newEdge = {};
      }
    });
    return edges;
  }
  
  function createInnerEdges(src, target) {
    const newEdge = {};
    newEdge["id"] = "e" + src + "-" + target;
    newEdge["source"] = String(src);
    newEdge["target"] = String(target);
    newEdge["animated"] = true;
    newEdge["zIndex"] = 999;
    return newEdge;
  }
  