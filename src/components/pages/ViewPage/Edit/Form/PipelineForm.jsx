

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import "./Form.scss"

const types = [
  {
    value: "linear",
    label: "Linear",
  },
  {
    value: "loop",
    label: "Loop",
  },
];

function PipelineForm(props) {
  const [piplineName, setPiplineName] = useState(props.nodeInfo.data.label);
  const [piplineType, setPiplineType] = useState(props.nodeInfo.type);

  useEffect(() => {
    setPiplineName(props.nodeInfo.data.label);
    setPiplineType(props.nodeInfo.type);
  }, [props.nodeInfo]);

  const handlePiplineNameChange = (event) => {
    setPiplineName(event.target.value);
  };

  const handlePiplineTypeChange = (event) => {
    setPiplineType(event.target.value);
  };

//handle click event - when push apply changes button will send the updated edit up the component tree to viewpage
  let handleClick = () => {
    props.setChangesToApply({
      ...props.nodeInfo,
      data: {
        ...props.nodeInfo.data,
        label: piplineName 
      },
      type: piplineType,
          });
          console.log("clicked apply changes", props.nodeInfo)
     };

  return (
    <div calssName = "edit-window-form">
      <form style={{ width: "100%" }}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={10}>
            <TextField
              id="phase-name"
              label="Name:"
              value={piplineName}
              margin="normal"
              fullWidth
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleClick();
                }
              }}
              onChange={handlePiplineNameChange}
            ></TextField>
          </Grid>
          <Grid xs={10} item>
            <TextField
              id="outlined-basic"
              label="type:"
              select
              value={piplineType}
              margin="normal"
              variant="outlined"
              onChange={handlePiplineTypeChange}
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid xs={6} item>
            <Button
              style={{ width: 175 }}
              onClick={handleClick}
              variant="contained"
            >
              APPLY CHANGES
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default PipelineForm;