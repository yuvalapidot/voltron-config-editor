import React from "react";
import ViewPage from "../ViewPage/ViewPage";
import "./FirstPage.scss";
import "../ViewPage/ViewPage.scss";
function FirstPage() {
  return (
    <>
      {/* <div className="container">
        <img className="logo" src={logo} alt="Logo" />
        <FileUpload />
      </div> */}
      <div className="window-conteiner">
        <ViewPage
          nodes = {[]}
        />
      </div>
    </>
  );
}

export default FirstPage;
