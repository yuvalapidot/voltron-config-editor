import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import styles from "./Form.module.scss"

const types = [
  {
    value: "blocking",
    label: "Blocking",
  },
  {
    value: "non_blocking",
    label: "Non Blocking",
  },
  {
    value: "watchdog",
    label: "Watchdog",
  },
];

function PhaseForm(props) 
{
  const [phaseName, setPhaseName] = useState(props.nodeInfo.data.label);
  const [phaseType, setPhaseType] = useState(props.nodeInfo.type);
  const [phaseEnable, setPhaseEnable] = useState(props.nodeInfo.enable);

  useEffect(() => {
    setPhaseName(props.nodeInfo.data.label);
    setPhaseType(props.nodeInfo.type);
    setPhaseEnable(props.nodeInfo.enable);
  }, [props.nodeInfo]);

  const handlePhaseNameChange = (event) => {
    setPhaseName(event.target.value);
  };

  const handlePhaseTypeChange = (event) => {
    setPhaseType(event.target.value);
  };

  const handleEnableChange = (event) => {
    setPhaseEnable(event.target.value);
  };

  // handle click event - when push apply changes button will send the updated edit up the component tree to viewpage
  let handleClick = () => {
    props.setChangesToApply({
      ...props.nodeInfo,
      data: {
        ...props.nodeInfo.data,
        label: phaseName,
      },
      type: phaseType,
      selected: phaseEnable,
    });
  };

  return (
    <div className={styles['edit-window-form']}>
      <form style={{ width: "100%" }}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={10}>
            <TextField
              id="phase-name"
              label="Name:"
              value={phaseName}
              margin="normal"            
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleClick();
                }
              }}
              onChange={handlePhaseNameChange}
            ></TextField>
          </Grid>
          <Grid xs={10} item>
            <TextField
              id="outlined-basic"
              label="Type:"
              select
              defaultValue={phaseType}
              margin="normal"
              variant="outlined"
              onChange={handlePhaseTypeChange}
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
                defaultValue="true"
                // value={SPEnable}
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

export default PhaseForm;