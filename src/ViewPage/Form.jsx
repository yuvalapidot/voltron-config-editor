import React from "react";
import TextField from "@mui/material/TextField";

function Form() {
  return (
    <div style={formStyle}>
      <form>
        <TextField
          margin="normal"
          id="outlined-basic"
          label="name"
          variant="outlined"
        />
        <br />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="name"
          variant="outlined"
        />
      </form>
    </div>
  );
}

let formStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

export default Form;
