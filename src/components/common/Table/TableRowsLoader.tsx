import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

interface Props {
    rowsNum: number;
    numColumns: number
}
const TableRowsLoader: React.FC<Props> = ({ rowsNum, numColumns }) => {

    const renderSkeletonTableCells = (numColumns: number) => {
        const cells = [];

        for (let i = 0; i < numColumns; i++) {
            cells.push(
                <TableCell key={i}>
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            );
        }

        return cells;
    };

    return [...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <Skeleton animation="wave" variant="text" />
            </TableCell>
            {renderSkeletonTableCells(numColumns)}
        </TableRow>
    ));
};

export default TableRowsLoader;