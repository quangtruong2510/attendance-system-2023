import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  onIconClick: (id: number) => void;
}
const DeleteIcon = styled(DeleteRoundedIcon)`
  cursor: pointer;
`;
const EditIconButton: React.FC<Props> = (props: Props) => {
return (
  <Tooltip title="Delete">
    <DeleteIcon
      style={{ fill: '#0072ea' }}
      aria-label="Delete"
      onClick={() => {
        props.onIconClick(1);
      }}
    />
  </Tooltip>
);
}
export default EditIconButton;