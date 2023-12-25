import { TextField, MenuItem } from "@mui/material";
import styled from "styled-components";
import Box from "@mui/material/Box";
import React, { ChangeEvent } from "react";
import Payload, { OptionSelect } from "../../../models/Utils";
import { makeStyles } from "@material-ui/core/styles";

interface PropsSelectField {
  id: string;
  name: string;
  options: OptionSelect[];
  value: string;
  label: string;
  onChange: (payload: Payload) => void;
}

interface PropsTextField {
  id: string;
  name: string;
  value: any;
  label: string;
  onChange: (payload: Payload) => void;
}

const TextInputField: React.FC<PropsTextField> = (props: PropsTextField) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let payLoad: Payload = {
      key: event.target.name,
      value: event.target.value,
    };
    props.onChange(payLoad);
  };
  return (
    <Box sx={{ display: "flex", pt: "10px" }}>
      <Label>{props.label}</Label>
      <TextField
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        size="small"
        fullWidth
        helperText=""
      ></TextField>
    </Box>
  );
};

const SelectInputField: React.FC<PropsSelectField> = (
  props: PropsSelectField
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let payLoad: Payload = {
      key: event.target.name,
      value: event.target.value,
    };
    props.onChange(payLoad);
  };
  return (
    <Box sx={{ display: "flex", pt: "10px" }}>
      <Label>{props.label}</Label>
      <TextField
        id={props.id}
        name={props.name}
        select
        value={props.value}
        size="small"
        onChange={handleChange}
        fullWidth
      >
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

const DateTimeInputField: React.FC<PropsTextField> = (
  props: PropsTextField
) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let payLoad: Payload = {
      key: event.target.name,
      value: event.target.value,
    };
    props.onChange(payLoad);
  };
  return (
    <Box sx={{ display: "flex", pt: "10px" }}>
      <Label>{props.label}</Label>
      <TextField
        id={props.id}
        name={props.name}
        InputLabelProps={{ shrink: true, required: true }}
        helperText={""}
        type="date"
        onChange={handleChange}
        value={props.value}
        fullWidth
        size="small"
      ></TextField>
    </Box>
  );
};

interface CustomInputProps {
  id?: string;
  label?: string;
  value?: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  size?: string;
  type?: string;
  maxLength?: number;
  style?: object;
  isDisable?: boolean;
  isMultiline?: boolean;
  maxRows?: number;
  rows?: number;
  width?: string;
  messageError?: string | undefined;
  require?: boolean;
}

const useStyles = makeStyles({
  input: {
    "&::placeholder": {
      color: "#888",
      fontStyle: "italic",
    },
    "&:focus::placeholder": {
      color: "#555",
      fontStyle: "normal",
    },
    "&:not(:placeholder-shown)::placeholder": {
      color: "transparent",
    },
  },
});
const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  fullWidth,
  type,
  maxLength,
  style,
  isDisable,
  isMultiline,
  maxRows,
  rows,
  messageError,
  require,
}) => {
  const classes = useStyles();
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> =
    type === "phone"
      ? {
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 10,
        }
      : { maxLength: maxLength };

  return (
    <TextField
      id={id}
      className={classes.input}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={"small"}
      type={type || undefined}
      inputProps={inputProps}
      style={style}
      sx={{
        fontSize: 13,
        ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root": {
          fontSize: 13,
        },
      }}
      multiline={isMultiline}
      disabled={isDisable}
      maxRows={maxRows ? maxRows : 1}
      rows={rows}
      error={!!messageError}
      helperText={messageError}
      InputLabelProps={{ shrink: true, required: require }}
    />
  );
};

const Label = styled.p`
  width: 130px;
`;

export { SelectInputField, TextInputField, DateTimeInputField, CustomInput };
