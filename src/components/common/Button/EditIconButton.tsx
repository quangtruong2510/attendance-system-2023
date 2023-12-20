import React from "react";
import Tooltip from "@mui/material/Tooltip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import styled from "styled-components";

interface Props {
  tooltip?: string;
  id: number;
  onIconClick: (id: number) => void;
}
const EditIcon = styled(EditRoundedIcon)`
  cursor: pointer;
`;
const EditIconButton: React.FC<Props> = (props: Props) => {
  return (
    <Tooltip title={props.tooltip ? props.tooltip : "Chỉnh sửa"}>
      <EditIcon
        style={{ fill: "rgb(17, 121, 87)" }}
        aria-label="edit"
        onClick={() => {
          props.onIconClick(props.id);
        }}
      />
    </Tooltip>
  );
};
export default EditIconButton;
