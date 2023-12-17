import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import styled from 'styled-components';

interface Props {
  id: number;
  onIconClick: (id: number) => void;
}
const EditIcon = styled(EditRoundedIcon)`
  cursor: pointer;
`;
const EditIconButton: React.FC<Props> = (props: Props) => {
  return (
    <Tooltip title="Chỉnh sửa">
      <EditIcon
        style={{ fill: '#0072ea' }}
        aria-label="edit"
        onClick={() => {
          props.onIconClick(props.id);
        }}
      />
    </Tooltip>
  );
}
export default EditIconButton;