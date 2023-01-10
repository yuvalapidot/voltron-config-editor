import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

function StepProducerForm(props) {
  const [SPName, setSPName] = useState(props.nodeInfo.data.label);

  useEffect(() => {
    setSPName(props.nodeInfo.data.label);
  }, [props.nodeInfo]);

  const handleSPNameChange = (event) => {
    setSPName(event.target.value);
  };
  console.log(props.nodeInfo);

  let handleClick = () => {
    props.setChangesToApply({
      ...props.nodeInfo,
      data: { ...props.nodeInfo.data, label: SPName },
    });
  };

  return (
    <div style={formStyle}>
      <form style={{ width: "100%" }}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={10}>
            <TextField
              id="sp-name"
              label="Name:"
              value={SPName}
              margin="normal"
              fullWidth
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleClick();
                }
              }}
              onChange={handleSPNameChange}
            ></TextField>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id='sp-name'
              label='Name:'
              value={SPName}
              margin="normal"
              fullWidth
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleClick();
                }
              }}
              onChange={handleSPNameChange}
            ></TextField>
          </Grid>
          <Grid xs={6} item>
            <Button onClick={handleClick} variant="contained">
              APPLY CHANGES
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

let formStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

export default StepProducerForm;
