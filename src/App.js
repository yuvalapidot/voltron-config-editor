import { useState } from "react";
import "./App.scss";
import FileUpload from "./FileUpload/FileUpload.jsx";

function App() {
  const [file, setFile] = useState();

  return (
    <div className="App">
      <div className="title">Upload file</div>
      <FileUpload file={file} setFile={setFile} />
    </div>
  );
}

export default App;
