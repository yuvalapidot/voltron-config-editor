import "./App.scss";
import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/pages/FirstPage/FirstPage";
import ViewPage from "./components/pages/ViewPage/ViewPage";

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
