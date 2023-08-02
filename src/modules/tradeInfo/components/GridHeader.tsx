import React from 'react';
import {getGridHeaderText} from '../tradeInfo.helpers';

// @ts-ignore
export const GridHeader = ({columnIndex, style}) => {
    return (
        <div
            key={columnIndex}
            style={{
                ...style,
                background: 'lightgray',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
            }}
        >
            {getGridHeaderText(columnIndex)}
        </div>
    );
};
