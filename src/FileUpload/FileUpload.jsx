import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.scss";
import { useNavigate } from "react-router-dom";
import { nodes, calculatePosition, setNodes, setEdges } from "../elements";
import { flatten } from "../elements";

// Here we call the backend functions to arrange the yaml functions and create the objects
const FileUpload = () => {
  const navigate = useNavigate();

  const uploadHandler = async (e) => {
    // get the file from the event
    const file = e.target.files[0];

    if (file != null) {
      // wrap the uploaded file with FormData object we can send via post request
      const data = new FormData();
      data.append("file_from_react", file);

      // send the FormData with fetch
      let response = await fetch("/upload", {
        method: "post",
        body: data,
      });

      // wait for response and make a json out of it
      let res = await response.json();

      // validate the response
      if (res.response == 0) {
        alert("Error uploading file");
      } else {
        // console.log(res.response.nodes);
        // Set nodes and edges and move to the ViewPage
        setNodes(res.response.nodes);
        setEdges(res.response.edges);
        navigate("/view");
      }
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
