import React from 'react';
import {getPriceColor} from "../tradeInfo.helpers";

// @ts-ignore
export const GridCell = (props) => {
    const {columnIndex, columnCount, rowIndex, style, data} = props;

    const cellStyle = {
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #ccc',
    };

    const lastColumnStyle = {
        ...cellStyle,
        color: getPriceColor(data[rowIndex - 1]),
    };

    const cellData = data[rowIndex - 1][columnIndex];

    return (
        <div key={rowIndex} style={columnIndex === columnCount - 1 ? lastColumnStyle : cellStyle}>
            {cellData}
        </div>
    );
};
