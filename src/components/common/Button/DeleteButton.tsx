import React from "react";
import Tooltip from "@mui/material/Tooltip";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import styled from "styled-components";

interface Props {
  id: number;
  onIconClick: (id: number) => void;
}
const DeleteIcon = styled(DeleteRoundedIcon)`
  cursor: pointer;
`;
const EditIconButton: React.FC<Props> = (props: Props) => {
  return (
    <Tooltip title="Xóa">
      <DeleteIcon
        color="error"
        aria-label="Delete"
        onClick={() => {
          props.onIconClick(props.id);
        }}
      />
    </Tooltip>
  );
};
export default EditIconButton;
