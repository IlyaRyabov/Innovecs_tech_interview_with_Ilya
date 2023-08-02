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

export type TradeInfoModel = {
    id: number,
    i: ModelInfo,
    market: Market,
};

export type NormalizedModel = ModelInfo & {
    id: number,
    market: Market,
};
