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
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import { OptionSelect } from "../../models/Utils";
import { Class } from "../../models/class";
import { initClass } from "../../store/class/initialize";
import { addClass, fetchClasses } from "../../store/class/operation";
import { AppDispatch, useSelector } from "../../store/configstore";
import { clearValidationErrors } from "../../store/teachers/slice";

interface AddClassDialogProps {
  open: boolean;
  isNew: boolean;
  selectedClass?: Class | null;
  onClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

const ClassEditDialog: React.FC<AddClassDialogProps> = ({ isNew, open, onClose, selectedClass }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newClass, setNewClass] = useState<Class>(initClass);
  const grades: OptionSelect[] = useSelector(
    (state) => state.initial.gradeList
  );
  const teachers: OptionSelect[] = useSelector(
    (state) => state.initial.unAssignedTeachers
  );
  const validationErrors = useSelector((state) => state.class.validationErrors);

  console.log("selectedClass", selectedClass);

  const handleChangeFilter =
    (property: keyof Class) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        setNewClass((prev) => ({ ...prev, [property]: event.target.value }));
      };

  const handleAddClass = () => {
    dispatch(addClass(newClass))
      .unwrap()
      .then(() => {
        setNewClass(initClass);
        onClose();
        dispatch(fetchClasses());
      })
      .catch(() => { });
  };

  useEffect(() => {
    dispatch(clearValidationErrors());

  }, []);

  useEffect(() => {
    if (!isNew) {
      setNewClass(selectedClass || initClass);
    } else {
      setNewClass(initClass);
    }
  }, [selectedClass]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>Thêm mới lớp học</DialogTitle>
      <DialogContent>

        <Stack flexDirection={"row"} gap={2} paddingTop={1} marginTop={1}>
          <SelectDropdown
            id={"grade"}
            label="Khối"
            options={grades}
            value={newClass.gradeId}
            onChange={handleChangeFilter("gradeId")}
          />

          <SelectDropdown
            id={"teacher"}
            label="GVCN"
            options={teachers}
            value={newClass.teacherId}
            onChange={handleChangeFilter("teacherId")}
            width={200}
          />
        </Stack>
        <FormControl fullWidth style={{ margin: "20px 0px 0px 0px" }}>
          <CustomInput
            label="Tên lớp"
            type="text"
            fullWidth={true}
            size="small"
            value={newClass.className}
            onChange={handleChangeFilter("className")}
            messageError={
              validationErrors && validationErrors.className
                ? validationErrors.className
                : ""
            }
          />
        </FormControl>
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
