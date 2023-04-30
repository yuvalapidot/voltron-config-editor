import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
// import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import config from "../../../../../config";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const classes = config.SPClasses;

function StepProducerForm(props) {
  const [SPName, setSPName] = useState(props.nodeInfo.data.label);
  const [SPClass, setClass] = useState(props.nodeInfo.class.substring(14));
  const [SPEnable, setEnable] = useState(props.nodeInfo.enable);
  const [SPParams, setParams] = useState(
    JSON.stringify(props.nodeInfo.parameters)
  );
  // const [SPParams, setParams] = useState(props.nodeInfo.parameters);
  const [state, setState] = useState(props.nodeInfo.parameters);

  useEffect(() => {
    setSPName(props.nodeInfo.data.label);
    setClass(props.nodeInfo.class.substring(14));
    setEnable(props.nodeInfo.enable);
    setParams(JSON.stringify(props.nodeInfo.parameters));
  }, [props.nodeInfo]);

  const handleSPNameChange = (event) => {
    setSPName(event.target.value);
  };

  const handleClassChange = (event) => {
    setClass(event.target.value);
  };

  const handleEnableChange = (event) => {
    setEnable(event.target.value);
  };

  const handleParamsChange = (event) => {
    setParams(event.target.value);
  };

  // console.log(props.nodeInfo);

  let handleClick = () => {
    props.setChangesToApply({
      ...props.nodeInfo,
      data: { ...props.nodeInfo.data, label: SPName }, // ... = {example: "1", {example2: "2"}} -> {example: "1",example2: "2"} as Json
      class: "step_producer." + SPClass,
      // enable: SPEnable,
    });
    // console.log(props.nodeInfo);
  };

  const handleChange = (e, i) => {
    const { value, name } = e.target;
    const newState = [...state];
    newState[i] = {
      ...newState[i],
      [name]: value,
    };
    // console.log(newState);
    setState(newState);
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
              id="outlined-basic"
              label="Class:"
              select
              value={SPClass}
              margin="normal"
              variant="outlined"
              onChange={handleClassChange}
            >
              {classes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={10}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Enable:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                // value={SPEnable}
                defaultValue="true"
                onChange={handleEnableChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="outlined-textarea"
              label="Parameters:"
              value={SPParams}
              onChange={handleParamsChange}
              fullWidth
              multiline
            />
            {/* <List
              // onChange={handleParamsChange}
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {Object.entries(SPParams).map((value) => (
                <ListItem key={value}>
                  <ListItemText primary={`Line item ${value}`} />
                </ListItem>
              ))}
            </List> */}
            {/* <table className="App">
              <tbody>
                {state.map((item, index) => (
                  <tr key={index}>
                    {Object.keys(item).map((key) => (
                      <td key={`${index}-${key}`}>
                        <label>
                          {key}
                          {":  "}
                          <input
                            name={key}
                            value={item[key]}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table> */}
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
