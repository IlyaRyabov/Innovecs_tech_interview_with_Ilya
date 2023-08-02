import React, {useMemo} from 'react';
import {NormalizedModel, TradeInfoGridData} from '../tradeInfo.types';
import {getTradeInfoGridData} from '../tradeInfo.helpers';
import {TradeInfoGrid as TradeInfoGridComponent} from '../components/Grid';

type Props = {
    data: NormalizedModel[] | undefined,
};

export function TradeInfoGrid(props: Props) {
    const {data = []} = props;

    const tradeInfoGridData: TradeInfoGridData = useMemo(() => {
        if (data) {
            return getTradeInfoGridData(data);
        }
    }, [data]);

    return (
        <TradeInfoGridComponent
            data={tradeInfoGridData || []}
        />
    );
}
