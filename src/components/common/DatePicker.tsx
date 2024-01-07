import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import CommonUtil from "../../../src/utils/export";

interface DatePickerValueProps {
  label?: string | null;
  onDateSelected: (selectedDate: string) => void;
  initialValue?: string | null;
}

const DatePickerValue: React.FC<DatePickerValueProps> = ({
  onDateSelected,
  initialValue,
  label,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    initialValue ? dayjs(initialValue) : null
  );

  const handleDateChange = (newValue: Dayjs | null) => {
    let formattedDate = "";
    if (newValue) {
      formattedDate = newValue.format("DD-MM-YYYY");
    }
    setValue(newValue ?? null); // Set to undefined if newValue is null
    onDateSelected(formattedDate);
  };

  useEffect(() => {
    const date = CommonUtil.formatDate(initialValue || "");
    if (initialValue) {
      setValue(dayjs(date));
    }  else {
      setValue(null);
    }
  }, [initialValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{
          height: "57px !important",
        }}
        components={["DatePicker", "DatePicker"]}
      >
        <DatePicker
          sx={{
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              height: "42px !important",
            },
            "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
              top: "-8px !important",
            },
          }}
          format="DD/MM/YYYY"
          label={label}
          value={value}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerValue;
