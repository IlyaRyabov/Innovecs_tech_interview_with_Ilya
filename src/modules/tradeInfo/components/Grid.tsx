import {memo} from 'react';
import isEqual from 'lodash/isEqual';
import {AutoSizer, Grid as GridVirtualized} from 'react-virtualized';
import {getGridHeaderText, getPriceColor} from '../tradeInfo.helpers';
import {TradeInfoGridData} from '../tradeInfo.types';

type Props = {
    data: TradeInfoGridData;
};

// TODO refactoring
const Grid = (props: Props): JSX.Element => {
    const {data} = props;

    if (!data?.length) {
        return (
            <div style={{marginTop: '20px'}}>
                <h1>No data</h1>
            </div>
        );
    }

    const columnCount = 3;
    const rowCount = data.length + 1;

    // @ts-ignore
    const cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        if (rowIndex === 0) {
            return (
                <div
                    key={key}
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
        }

        const cellData = data[rowIndex - 1][columnIndex];

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

        return (
            <div key={key} style={columnIndex === columnCount - 1 ? lastColumnStyle : cellStyle}>
                {cellData}
            </div>
        );
    };

    return (
        <div style={{width: '100%', height: 'calc(100vh - 80px)'}}>
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
                    />
                )}
            </AutoSizer>
        </div>
    );
};

export const TradeInfoGrid = memo(Grid, (prevProps, nextProps) => {
    return isEqual(prevProps.data, nextProps.data);
});
