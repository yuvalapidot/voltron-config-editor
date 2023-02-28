import "./App.scss";
import { Route, Routes } from "react-router-dom";
import FirstPage from "./FirstPage";
import ViewPage from "./ViewPage/ViewPage";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
  );
}

export default App;
