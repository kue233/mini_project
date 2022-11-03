import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { HTMLInputTypeAttribute } from "react";

/**
 * this is a reusable component for "add profile" component
 * props:
    i.
    id (string)
    ii.
    type (string)
    iii.
    name (string)
    iv.
    value (string)
    v.
    valid (boolean)
    vi.
    onChange (function)
 */
type Props = {
  id: string;
  type: string;
  name: string;
  value: string;
  valid: boolean;
  onChangeHandler: (value: string) => void;
};

const ReInputField = (props: Props) => {
  const accpetType = props.type === "file" ? "image/*" : "*";
  const borderColor = props.valid ? "white" : "red";
  const bgColor = props.valid ? "white" : "pink";
  let inputStyle = {
    borderColor: borderColor,
    backgroundColor: bgColor,
    padding: 10,
    margin: 10,
  };
  return (
    <div>
      <form>
        <input
          style={inputStyle}
          type={props.type}
          name={props.name}
          placeholder={props.value}
          accept={accpetType}
          onChange={(e) => {
            props.onChangeHandler(
              // props.type === "file" ? e.target.files[0] : e.target.value
              e.target.value
            );
          }}
        ></input>
      </form>
    </div>
  );
};

export default ReInputField;
