import "./App.scss";
import { Route, Routes, useNavigate} from "react-router-dom";
import FirstPage from "./components/pages/FirstPage/FirstPage";
import ViewPage from "./components/pages/ViewPage/ViewPage";
import ToolBar from "./ToolBar";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F5") {
        navigate("/");
        event.stopPropagation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  return (
    <div className="App" style={{ height: "100%" }}>
      <ToolBar />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
  );
}

export default App;