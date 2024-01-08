import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../components/common/FormInput/InputField";
import { OptionSelect } from "../../models/Utils";
import { Account } from "../../models/account";
import { initAccount } from "../../store/accounts/initialize";
import { addAccount, updateAccount } from "../../store/accounts/operation";
import { clearValidationErrors } from "../../store/accounts/slice";
import { AppDispatch, useSelector } from "../../store/configstore";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import { roles } from "../../constant/Utils";

interface Props {
  isNew: boolean;
  isOpen: boolean;
  selectedAccount?: Account | null;
  handleClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

const EditAccount: React.FC<Props> = ({
  isNew,
  isOpen,
  selectedAccount,
  handleClose,
  onClickEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [account, setAccount] = useState<Account>(initAccount);
  const validationErrors = useSelector(
    (state) => state.account.validationErrors
  );

  const teachers: OptionSelect[] = useSelector(
    (state) => state.initial.teacherWithoutAccount
  );
  const handleInputChange =
    (property: keyof Account) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement> | any) => {
        setAccount((prev) => ({ ...prev, [property]: event.target.value }));
      };

  const handleEditAccount = async () => {
    if (isNew) {
      dispatch(addAccount(account))
        .unwrap()
        .then(() => {
          handleClose();
          setAccount(initAccount)
          onClickEdit(true);

        })
        .catch(() => {
          onClickEdit(false);
        });
    } else {
      dispatch(updateAccount(account))
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
      setAccount(selectedAccount || initAccount);
    } else {
      setAccount(initAccount);
    }
  }, [selectedAccount, dispatch]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>
        {`${isNew ? "Thêm mới " : "Chỉnh sửa thông tin"} tài khoản`}
      </DialogTitle>
      <DialogContent
        style={{ height: "fit-content", width: "400px", maxWidth: "470px" }}
      >
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            id={"name"}
            value={account.email}
            label={"Tài khoản"}
            onChange={handleInputChange("email")}
            messageError={
              validationErrors && validationErrors.email
                ? validationErrors.email
                : ""
            }
          />
        </FormControl>
        <FormControl fullWidth style={{ margin: "20px 0px" }}>
          <CustomInput
            id="pasword"
            label="Mật khẩu"
            type="password"
            fullWidth={true}
            size="small"
            value={account.password}
            onChange={handleInputChange("password")}
            messageError={
              validationErrors && validationErrors.password
                ? validationErrors.password
                : ""
            }
          />
        </FormControl>
        <Stack flexDirection={"row"} gap={2} paddingTop={1} marginTop={2}>
          <SelectDropdown
            id={"teacher"}
            label="GVCN"
            options={teachers}
            value={account.teacherId}
            onChange={handleInputChange("teacherId")}
            width={200}
          />
          <SelectDropdown
            id={"role"}
            label="Phân quyền"
            options={roles}
            value={account.role}
            onChange={handleInputChange("role")}
            width={200}
          />
        </Stack>

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
        <Button variant="contained" size="medium" onClick={handleEditAccount}>
          {isNew ? "Thêm mới" : "Cập nhật"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccount;
