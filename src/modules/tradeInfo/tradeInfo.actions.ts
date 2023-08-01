import {TradeInfo} from './tradeInfo.contants';
import {
    FetchTradeInfoData,
    GetFilteredAndSortedTradeData,
    NormalizedModel, SearchCache,
    SetIsTradeInfoLoading,
    SetSearchCache,
    SetTradeInfoData,
    SetTradeInfoError,
} from './tradeInfo.types';

export const setIsLoading = (
    isLoading: boolean,
): SetIsTradeInfoLoading => ({
    type: TradeInfo.SetIsLoading,
    isLoading,
});

export const fetchTradeInfoData = (): FetchTradeInfoData => ({
    type: TradeInfo.FetchData,
});

export const setTradeInfoData = (
    data: NormalizedModel[],
): SetTradeInfoData => ({
    type: TradeInfo.SetData,
    data,
});

export const setSearchCache = (
    data: SearchCache,
): SetSearchCache => ({
    type: TradeInfo.SetSearchCache,
    data,
});

export const getFilteredAndSortedData = (
    query: string,
): GetFilteredAndSortedTradeData => ({
    type: TradeInfo.GetFilteredAndSortedData,
    query,
});

export const setTradeInfoError = (
    error: string,
): SetTradeInfoError => ({
    type: TradeInfo.SetError,
    error,
});
