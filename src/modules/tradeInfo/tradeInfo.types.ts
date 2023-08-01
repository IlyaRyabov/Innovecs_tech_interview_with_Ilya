import {TradeInfo} from './tradeInfo.contants';

export type Market = 'US' | 'CH' | 'EU' | 'IN';
export type ItemType = 'PRIVATE' | 'OFFCHAIN' | 'ONCHAIN';

export type FilteredField = 'type' | 'name';

export type ModelInfo = {
    type: ItemType,
    price: {
        high: number,
        low: number,
        lastTradedPrevious: number,
        lastTraded: number,
    };
    lotSize: '1' | '10' | '100',
    currency: string,
    name: string,
}

export type Model = {
    id: number,
    i: ModelInfo,
    market: Market,
};

export type NormalizedModel = ModelInfo & {
    id: number,
    market: Market,
};

export type SearchCache = Record<string, NormalizedModel[]>;

export type TradeInfoState = {
    isLoading: boolean,
    data: NormalizedModel[] | undefined,
    searchCache: SearchCache | undefined,
    errorText: string | undefined,
};

export type SetIsTradeInfoLoading = {
    type: TradeInfo.SetIsLoading,
    isLoading: boolean,
};

export type FetchTradeInfoData = {
    type: TradeInfo.FetchData,
};

export type SetTradeInfoData = {
    type: TradeInfo.SetData,
    data: NormalizedModel[],
};

export type SetSearchCache = {
    type: TradeInfo.SetSearchCache,
    data: SearchCache,
};

export type GetFilteredAndSortedTradeData = {
    type: TradeInfo.GetFilteredAndSortedData,
    query: string,
};

export type SetTradeInfoError = {
    type: TradeInfo.SetError,
    error: string,
};

export type TradeInfoAction =
    | SetIsTradeInfoLoading
    | SetTradeInfoData
    | SetSearchCache
    | SetTradeInfoError;
