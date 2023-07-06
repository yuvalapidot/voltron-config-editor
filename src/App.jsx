import "./App.scss";
import { Route, Routes, useNavigate} from "react-router-dom";
import FirstPage from "./components/pages/FirstPage/FirstPage";
import ViewPage from "./components/pages/ViewPage/ViewPage";
import ToolBar from "./ToolBar";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // When you refresh the page with F5 - go back to home page since you cant upload a file if you are at /view
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
      <ReactFlowProvider>
      <ToolBar />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </ReactFlowProvider>
    <ToastContainer />
    </div>
  );
}

export default App;