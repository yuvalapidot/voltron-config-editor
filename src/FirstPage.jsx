import React from "react";
import FileUpload from "./FileUpload/FileUpload";
import logo from "./assets/VEC-UI.png";
import "./FirstPage.scss";

function FirstPage() {
  return (
    <>
      <div className="container">
        {/* <div className="title">Upload file</div> */}
        <img className="logo" src={logo} alt="Logo" />
        <FileUpload />
      </div>
    </>
  );
}

export default FirstPage;
