import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import { OptionSelect } from "../../models/Utils";

interface AddClassDialogProps {
  open: boolean;
  onClose: () => void;
}

interface NewClass {
  grade: string;
  name: string;
  teacher: string;
}

const ClassEditDialog: React.FC<AddClassDialogProps> = ({ open, onClose }) => {
  const [newClass, setNewClass] = useState<NewClass>({
    grade: "",
    name: "",
    teacher: "",
  });

  const handleChangeFilter =
    (property: keyof NewClass) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
      setNewClass((prev) => ({ ...prev, [property]: event.target.value }));
    };

  const handleAddClass = () => {
    console.log("aaaaaaaaaaa", newClass);

    onClose();
  };

  const grades: OptionSelect[] = [
    { value: 1, label: "6" },
    { value: 2, label: "7" },
    { value: 3, label: "8" },
    { value: 4, label: "9" },
  ];

  const teachers: OptionSelect[] = [
    { value: 1, label: "Nguyễn Văn A" },
    { value: 2, label: "Nguyễn Văn B" },
    { value: 3, label: "Nguyễn Văn C" },
    { value: 4, label: "Nguyễn Văn D" },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color={"rgb(65, 84, 241)"}>Thêm mới lớp học</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            label="Tên lớp"
            type="text"
            fullWidth={true}
            size="small"
            value={newClass.name}
            onChange={handleChangeFilter("name")}
          />
        </FormControl>
        <Stack flexDirection={"row"} gap={2} paddingTop={2} marginTop={1}>
          <SelectDropdown
            id={"grade"}
            label="Khối"
            options={grades}
            value={newClass.grade}
            onChange={handleChangeFilter("grade")}
          />

          <SelectDropdown
            id={"teacher"}
            label="GVCN"
            options={teachers}
            value={newClass.teacher}
            onChange={handleChangeFilter("teacher")}
            width={200}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={onClose}
        >
          Đóng
        </Button>
        <Button variant="contained" size="medium" onClick={handleAddClass}>
          THêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassEditDialog;
