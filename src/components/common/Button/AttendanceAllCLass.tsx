import React from "react";
import Tooltip from "@mui/material/Tooltip";
import GradingIcon from '@mui/icons-material/Grading';
import styled from "styled-components";

interface Props {
    id: number;
    onIconClick: (id: number) => void;
}
const AttendanceAllIcon = styled(GradingIcon)`
  cursor: pointer;
`;
const AttendanceAll: React.FC<Props> = (props: Props) => {
    return (
        <Tooltip title="Duyệt tất cả">
            <AttendanceAllIcon
                color="action"
                aria-label="Delete"
                onClick={() => {
                    props.onIconClick(props.id);
                }}
            />
        </Tooltip>
    );
};
export default AttendanceAll;
