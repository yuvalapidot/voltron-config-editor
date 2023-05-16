import React, { useState, useEffect } from "react";
import {
  Grid,
  InputLabel,
  FormControl,
  Input,
  TextField,
  Box,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from "@mui/material";
import config from "../../../../../config";
import "./Form.scss";

const classes = config.SPClasses;

function StepProducerForm(props) {
  const [SPName, setSPName] = useState(props.nodeInfo.data.label);
  const [SPClass, setClass] = useState(props.nodeInfo.class.substring(14));
  const [SPEnable, setEnable] = useState(props.nodeInfo.enable);
  const [SPParams, setParams] = useState(props.nodeInfo.parameters);
  // const [SPParams, setParams] = useState(props.nodeInfo.parameters);
  //const [state, setState] = useState(props.nodeInfo.parameters);

  useEffect(() => {
    console.log("updated step_producer", props.nodeInfo)
    console.log(props.nodeInfo.parameters)
    setSPName(props.nodeInfo.data.label);
    setClass(props.nodeInfo.class.substring(14));
    setEnable(props.nodeInfo.enable);
    setParams(props.nodeInfo.parameters);
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

  const handleParamsChange = (event, key) => {
    setParams({ ...SPParams, [key]: event.target.value });
  };
  // console.log(props.nodeInfo);

  //handle click event - when push apply changes button will send the updated edit up the component tree to viewpage
  let handleClick = () => {
    props.setChangesToApply({
      ...props.nodeInfo,
      data: { ...props.nodeInfo.data, label: SPName }, // ... = {example: "1", {example2: "2"}} -> {example: "1",example2: "2"} as Json
      class: "step_producer." + SPClass,
      // enable: SPEnable,
    });
  };

  // const handleChange = (e, i) => {
  //   const { value, name } = e.target;
  //   const newState = [...state];
  //   newState[i] = {
  //     ...newState[i],
  //     [name]: value,
  //   };
  //   // console.log(newState);
  //   setState(newState);
  // };

  return (
    <div className="edit-window-form">
      <form style={{ width: "100%" }}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={10}>
            <TextField
              id="sp-name"
              label="Name:"
              value={SPName}
              margin="normal"
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
          <Grid
            item xs={10} >
            <Box mt={1} mb={2}>
              <FormLabel >
                Parameters:
              </FormLabel>
            </Box>
          </Grid>
          <Grid container item xs={10}
            spacing={1}>
            {props.nodeInfo.parameters &&
              Object.entries(SPParams).map(([key, value]) => (
                <React.Fragment key={key}>
                  <Grid item xs={10}>
                    <FormControl variant="standard" style={dynamicInputStyle(value, true)}>
                      <InputLabel htmlFor="component-simple">key:</InputLabel>
                      <Input id="component-simple" disableUnderline defaultValue={key} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField style={dynamicInputStyle(value, false)}
                      id="outlined-basic"
                      margin="normal"
                      label="value:"
                      value={value}
                      onChange={(e) => handleParamsChange(e, key)}
                    />
                  </Grid>
                </React.Fragment>
              ))}
          </Grid>
          <Grid item xs={6} >
            <Box mt={2} mb={2} alignItems="center">
              <Button onClick={handleClick} variant="contained">
                APPLY CHANGES
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export let dynamicInputStyle = (value, isKey) => {
  if (isKey === false) {
    return {
      marginTop: "1px",
      width: value.length > 0 ? value.length * 12 : "auto",
    }//return
  } else {
    return {
      marginLeft: "15px",
      marginBottom: "1px",
      marginTop: "5px",
      width: value.length > 0 ? value.length * 12 : "auto",
    };
  };//else
}//dynamicInputStyle

export default StepProducerForm;
