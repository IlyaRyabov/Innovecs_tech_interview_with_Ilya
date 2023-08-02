import React, {useMemo} from 'react';
import {NormalizedModel} from '../tradeInfo.types';
import {getTradeInfoGridData} from '../tradeInfo.helpers';
import {TradeInfoGrid as TradeInfoGridComponent} from '../components/TradeInfoGrid';

type Props = {
    data: NormalizedModel[] | undefined,
};

export function TradeInfoContainer(props: Props) {
    const {data = []} = props;

    const tradeInfoGridData = useMemo(() => {
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
