import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import logo from "./assets/output-onlinepngtools.png";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";
import { yamlName, common, states, nodes, edges, setName, setCommon, setState, setNodes, setEdges, nodesToBackend } from "./elements";
import { yamlToDict, createElements, transformData} from "./BackToFrontFunc";
import yaml from "js-yaml";

function ToolBar() 
{
  // const nodesWithState = React.useContext(NodesContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadHandler = async () => {
    // create a hidden file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".yaml, .json"; // set the allowed file type(s)
  
    // listen for the user to select a file
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
  
      if (file != null) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const initialDict = yamlToDict(reader.result); // parse YAML into JS object
            const elementDict = createElements(initialDict);
            setName(elementDict.name);
            setCommon(elementDict.common);
            setState(elementDict.state);
            setNodes(elementDict.nodes);
            setEdges(elementDict.edges);
            navigate("/view");
            handleClose();
          }
          catch (err) 
          {
            console.log("not working")
            console.error(err);
            alert("Error parsing file");
          }
        };
        reader.readAsText(file);
      }
    });
  
    // simulate a click on the file input element to display the file input dialog
    fileInput.click();
  };  

  const saveHandler = () => {
    // const yamlContent = yaml.dump(nodesWithState);
    const newYamlContent = transformData(nodesToBackend, yamlName, common, states); // TODO: change nodesToBackend to 
    const yamlContent = yaml.dump(newYamlContent);
      const fileName = "voltron.yaml";
      const element = document.createElement("a");
      const file = new Blob([yamlContent], {type: 'text/yaml'});
      element.href = URL.createObjectURL(file);
      element.download = fileName;
      element.click();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img className="logo" src={logo} alt="Logo" />
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            ></IconButton>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "95%",
                  height: "100%",
                  marginBottom: "5px",
                  marginLeft: "5px",
                }}
                onClick={saveHandler}
              >
                <SaveIcon />
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: "95%",
                  height: "100%",
                  marginBottom: "5px",
                  marginLeft: "5px",
                }}
                onClick={uploadHandler}
              >
                <FileUploadIcon />
                Upload
              </Button>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ToolBar;
