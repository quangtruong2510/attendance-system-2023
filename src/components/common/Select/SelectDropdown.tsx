import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { OptionSelect } from "../../../models/Utils";
interface Props {
  id?: string;
  label?: string;
  options: OptionSelect[];
  value?: any;
  minWidth?: number;
  width?: number;
  errorMessage?: string;
  onChange: (event: SelectChangeEvent<any>) => void;
}

const SelectDropdown: React.FC<Props> = ({
  id,
  label,
  options,
  value,
  onChange,
  minWidth,
  width,
  errorMessage,
}) => {
  return (
    <FormControl
      style={{
        minWidth: minWidth ? minWidth : 80,
        maxWidth: "300px",
        width: width,
      }}
    >
      <InputLabel
        sx={{
          top: "-5px",
          minWidth: "120px",
          fontSize: 14,
        }}
        id="select-label"
      >
        {label}
      </InputLabel>
      <Select
        id={id}
        labelId="select-label"
        value={value}
        onChange={onChange}
        label={label}
        size={"small"}
        error={!!errorMessage}
      >
        {options.map((option: OptionSelect) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
