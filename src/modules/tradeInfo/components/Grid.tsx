import React from 'react';
import {AutoSizer, Grid as GridVirtualized} from 'react-virtualized';
import {isEqual} from 'lodash';
import {GridCell} from './GridCell';
import {GridHeader} from './GridHeader';
import {TradeInfoGridData} from '../tradeInfo.types';

type Props = {
    data: TradeInfoGridData,
};

const Grid = (props: Props): JSX.Element => {
    const {data} = props;

    if (!data?.length) {
        return <h1 style={{marginTop: '20px'}}>No data</h1>;
    }

    const columnCount = 3;
    const rowCount = data.length + 1;

    // @ts-ignore
    const cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        if (rowIndex === 0) {
            return (
                <GridHeader
                    columnIndex={columnIndex}
                    key={key}
                    style={style}
                />
            );
        } else {
            return (
                <GridCell
                    key={key}
                    columnIndex={columnIndex}
                    columnCount={columnCount}
                    rowIndex={rowIndex}
                    style={style}
                    data={data}
                />
            );
        }
    };

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
            <AutoSizer>
                {({ width, height }) => (
                    <GridVirtualized
                        width={width}
                        height={height}
                        columnCount={columnCount}
                        rowCount={rowCount}
                        columnWidth={width / columnCount}
                        rowHeight={40}
                        cellRenderer={cellRenderer}
                        data={data}
                    />
                )}
            </AutoSizer>
        </div>
    );
};

export const TradeInfoGrid = React.memo(Grid, (prevProps, nextProps) => {
    return isEqual(prevProps.data, nextProps.data);
});
