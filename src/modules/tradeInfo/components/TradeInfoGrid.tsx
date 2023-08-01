import {memo} from 'react';
import {AutoSizer, Grid as GridVirtualized} from 'react-virtualized';
import isEqual from 'lodash/isEqual';
import {getPriceColor} from '../tradeInfo.helpers';

type Props = {
    data: any;
};

// TODO need to be refactored
const Grid = (props: Props): JSX.Element => {
    const {data} = props;

    if (!data.length) {
        return <h1>No data</h1>;
    }

    const columnCount = 3;
    const rowCount = data.length + 1;

    // @ts-ignore
    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        if (rowIndex === 0) {
            let headerText;
            switch (columnIndex) {
                case 0:
                    headerText = 'Item Name';
                    break;
                case 1:
                    headerText = 'Market';
                    break;
                case 2:
                    headerText = 'Price';
                    break;
                default:
                    headerText = '';
                    break;
            }
            return (
                <div key={key} style={{...style}}>
                    {headerText}
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
        <div style={{width: '100%', height: 'calc(100vh - 40px)'}}>
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
