import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.scss";

const FileUpload = ({ file, setFile }) => {
  const uploadHandler = (event) => {
    const uploadedFile = event.target.files[0];
  };

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
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
