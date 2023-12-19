import { useState } from "react";
import { Stack } from "rsuite";

export default function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handler function to update the selected date
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  // Handler function to handle the button click and log the selected date
  const handleButtonClick = () => {
    console.log("Selected Date:", selectedDate);
    // Add any additional logic you need with the selected date
  };
  return (
    <Stack spacing={4}>
      <DataPicker></DataPicker>
    </Stack>
  );
}
