import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.scss";
import { useNavigate } from "react-router-dom";
import { nodes, calculatePosition, setNodes, setEdges } from "../../elements";
import { flatten } from "../../elements";
import { yamlToDict, createElements} from "../../BackToFrontFunc";
import yaml from "js-yaml";


const FileUpload = () => {
  const navigate = useNavigate();

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    
    if (file != null) {
      const reader = new FileReader();
      reader.onload  = () => {
        
        try {
          //const data = yaml.load(reader.result); // parse YAML into JS object
          const initialDict = yamlToDict(reader.result);
          const elementDict = createElements(initialDict)
          console.log(elementDict);
          console.log("im in");
          setNodes(elementDict.nodes);
          setEdges(elementDict.edges);
          navigate("/view");
  

        } catch (err) {
          console.log("not working")
          console.error(err);
          alert("Error parsing file");
        }
      };
      reader.readAsText(file);
      
    }
  };
  

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" accept=".yaml, .json" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">JSON, YAML</p>
      </div>
    </>
  );
};

export default FileUpload;