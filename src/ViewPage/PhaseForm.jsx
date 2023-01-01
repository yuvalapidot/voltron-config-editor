import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const types = [
  {
    value: 'blocking',
    label: 'Blocking'
  },
  {
    value: 'non_blocking',
    label: 'Non Blocking'
  },
  {
    value: 'watchdog',
    label: 'Watchdog'
  },
]


function EditPhase() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <div style={formStyle}>
      <form>
        <TextField
          id="phase-name"
          label="Name"
          margin="normal"          
          variant="outlined"
          value = {value}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Type"
          select
          defaultValue="blocking"
          margin="normal"
          variant="outlined"

        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Enable</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="on" control={<Radio />} label="On" />
            <FormControlLabel value="off" control={<Radio />} label="Off" />
            <FormControlLabel value="config" control={<Radio />} label="From Configuration File" />            
          </RadioGroup>
        </FormControl>
        <div ></div>
      </form>
    </div>
  );
}

let formStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

export default EditPhase;
