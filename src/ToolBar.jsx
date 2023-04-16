import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import logo from "./assets/output-onlinepngtools.png";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";
import { nodes, calculatePosition, setNodes, setEdges } from "./elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { flatten } from "./elements";
import { yamlToDict, createElements} from "./BackToFrontFunc";
import yaml from "js-yaml";

const ToolBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    // handle menu item click
  };

  // Here we call the backend functions to arrange the yaml functions and create the objects
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
        reader.onload  = () => {
          
          try {
            //const data = yaml.load(reader.result); // parse YAML into JS object
            const initialDict = yamlToDict(reader.result);
            const elementDict = createElements(initialDict)
            console.log(elementDict);
            console.log("im in");
            setNodes(elementDict.nodes);
            setEdges(elementDict.edges);
            navigate("/view");
    
  
          } catch (err) {
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
                onClick={handleClose}
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
