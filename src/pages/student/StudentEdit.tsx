import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Gender } from "../../Type/Utils";
import DatePickerValue from "../../components/common/DatePicker";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import { OptionSelect } from "../../models/Utils";
import { Student } from "../../models/student";
import { AppDispatch, useSelector } from "../../store/configstore";
import { initStudent } from "../../store/students/initialize";
import { addStudent, updateStudent } from "../../store/students/operation";
import { clearValidationErrors } from "../../store/students/slice";
import { Roles } from "../../utils/role";

import { ClearAll, CloudUpload } from "@mui/icons-material";
import styled from "styled-components";
import "./index.scss";

interface Props {
  isNew: boolean;
  isOpen: boolean;
  selectedStudent?: Student | null;
  handleClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

const EditStudent: React.FC<Props> = ({
  isNew,
  isOpen,
  selectedStudent,
  handleClose,
  onClickEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const validationErrors = useSelector(
    (state) => state.students.validationErrors
  );

  const classes: OptionSelect[] = useSelector(
    (state) => state.initial.classSelectionList
  );
  const role = useSelector(state => state.authentication.role)
  const [student, setStudent] = useState<Student>(initStudent);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;

    if (selectedImages) {
      const imagesArray = Array.from(selectedImages);

      const imagePromises = imagesArray.map((image) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result.toString());
            }
          };
          reader.readAsDataURL(image);
        });
      });

      Promise.all(imagePromises).then(() => {
        setImages((prevImages) => [...prevImages, ...imagesArray]);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];

    newImages.splice(index, 1);

    setImages(newImages);
  };

  const renderPreviewImages = () => {
    return images.map((image, index) => (
      <div key={index} className="image-wrapper">
        <img src={URL.createObjectURL(image)} alt={`preview-${index}`} />
        <IconButton
          className="delete-button"
          onClick={() => handleRemoveImage(index)}
        >
          <DeleteRoundedIcon fontSize="large" style={{ width: "30px", height: "20px" }} />
        </IconButton>
      </div>
    ));
  };

  const handleResetImages = () => {
    setImages([]);
  };

  const handleInputChange =
    (property: keyof Student) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement> | any) => {
        setStudent((prev) => ({ ...prev, [property]: event.target.value }));
      };

  const onDateSelected = (date: string) => {
    console.log("onDateSelected", date);

    setStudent((prev) => ({ ...prev, dateOfBirth: date }));
  }

  function encodeQueryString(params: Student): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}= ${value}`)
      .join("&");
  }

  const handleEditStudent = async () => {
    if (isNew) {
      const imageData = new FormData();
      images.forEach((image) => {
        imageData.append(`files`, image);
      });

      const queryString = encodeQueryString(student);
      const payload = { image: imageData, queryString: queryString }
      dispatch(addStudent(payload))
        .unwrap()
        .then(() => {
          handleClose();
          setStudent(initStudent)
          onClickEdit(true);
        })
        .catch(() => {
          onClickEdit(false);
        });
    } else {
      dispatch(updateStudent(student))
        .unwrap()
        .then(() => {
          handleClose();
          onClickEdit(true);
        })
        .catch(() => {
          onClickEdit(false);
        });
    }
  };

  useEffect(() => {
    dispatch(clearValidationErrors());
    if (!isNew) {
      setStudent(selectedStudent || initStudent);
    } else {
      setStudent(initStudent);
    }
  }, [selectedStudent, dispatch]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>
        {`${isNew ? "Thêm mới " : "Chỉnh sửa thông tin"} học sinh`}
      </DialogTitle>
      <DialogContent
        style={{ height: "fit-content", width: "auto", maxWidth: "470px" }}
      >
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            id={"name"}
            value={student.name}
            label={"Họ và Tên"}
            onChange={handleInputChange("name")}
            messageError={
              validationErrors && validationErrors.name
                ? validationErrors.name
                : ""
            }
          />
        </FormControl>
        <Stack
          flexDirection={"row"}
          gap={2}
          marginTop={1}
          alignItems={"center"}
        >
          <FormControl
            error={
              validationErrors && validationErrors.dateOfBirth ? true : false
            }
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={student?.gender}
              onChange={handleInputChange("gender")}
            >
              <FormControlLabel
                value={Gender.MALE}
                control={<Radio size="small" />}
                label="Nam"
              />
              <FormControlLabel
                value={Gender.FEMALE}
                control={<Radio size="small" />}
                label="Nữ"
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack
          flexDirection={"row"}
          gap={2}
          marginTop={1}
          style={{ maxWidth: "100%" }}
        >
          {role === Roles.ADMIN && (
            <SelectDropdown
              id={"class"}
              marginTop={9}
              minWidth={120}
              label="Lớp"
              options={classes}
              value={student.classId}
              onChange={handleInputChange("classId")}
              errorMessage={
                validationErrors && validationErrors.classId
                  ? validationErrors.classId
                  : ""
              }
            />
          )}
          <DatePickerValue
            onDateSelected={onDateSelected}
            label={"Ngày sinh"}
            initialValue={student.dateOfBirth}
          ></DatePickerValue>
        </Stack>
        <FormControl fullWidth style={{ margin: "20px 0px" }}>
          <CustomInput
            id="phone"
            label="Số điện thoại"
            type="phone"
            fullWidth={true}
            size="small"
            placeholder="xxx-xxx-xxxx"
            value={student.phone}
            onChange={handleInputChange("phone")}
            messageError={
              validationErrors && validationErrors.phone
                ? validationErrors.phone
                : ""
            }
          />
        </FormControl>

        <FormControl fullWidth>
          <CustomInput
            label="Địa chỉ"
            type="text"
            fullWidth={true}
            size="small"
            value={student.address}
            onChange={handleInputChange("address")}
            style={{ width: "100%" }}
            messageError={
              validationErrors && validationErrors.address
                ? validationErrors.address
                : ""
            }
          />
        </FormControl>
        {isNew && (<>
          <Stack mt={2} flexDirection={"row"} gap={10}>
            <div className="image-uploader">
              <input
                accept="image/*"
                className="image-uploader"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="contained-button-file">
                <div className="form-image">
                  <CloudUpload
                    style={{ width: "40px", height: "40px" }}
                    color="primary"
                  />
                  Thêm ảnh
                </div>
              </label>

              <ContainImage>{renderPreviewImages()}</ContainImage>
            </div>
          </Stack>
          {images.length > 0 && (
            <Button
              size="small"
              style={{
                marginTop: "10px",
                height: "35px",
                fontSize: "14px",
                textTransform: "none",
              }}
              variant="outlined"
              startIcon={<ClearAll />}
              color="error"
              onClick={handleResetImages}
            >
              Xóa ảnh
            </Button>
          )}
        </>)}


      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button variant="contained" size="medium" onClick={handleEditStudent}>
          {isNew ? "Thêm mới" : "Cập nhật"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ContainImage = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "10px !important",
  overflowX: "auto",

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
}));

export default EditStudent;
