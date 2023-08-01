import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TradeInfoGrid as TradeInfoGridComponent} from '../components/TradeInfoGrid';
import {NormalizedModel} from '../tradeInfo.types';
import {getTradeInfoData, isTradeInfoLoading} from '../tradeInfo.selectors';
import {fetchTradeInfoData} from '../tradeInfo.actions';
import {getTradeInfoGridData} from '../tradeInfo.helpers';

export const TradeInfoGrid = () => {
    const dispatch = useDispatch();

    const isLoading: boolean = useSelector(isTradeInfoLoading);
    const tradeInfoData: NormalizedModel[] | undefined = useSelector(getTradeInfoData);

    useEffect(() => {
        dispatch(fetchTradeInfoData());
    }, [dispatch]);

    const tradeInfoGridData = useMemo(() => {
        if (tradeInfoData) {
            return getTradeInfoGridData(tradeInfoData);
        }
    }, [tradeInfoData]);

    if (isLoading || !tradeInfoData) {
        return <h1>Loading</h1>;
    }

    return (
        <TradeInfoGridComponent
            data={tradeInfoGridData}
        />
    );
}
