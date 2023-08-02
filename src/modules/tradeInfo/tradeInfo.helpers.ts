import {isPartialStringMatch} from 'helpers/string.helpers';
import {
    FilteredField,
    NormalizedModel,
    TradeInfoModel,
} from './tradeInfo.types';
import {marketPriority} from './tradeInfo.mock';

export const normalizeTradeData = (
    data: TradeInfoModel[],
): NormalizedModel[] => data.map(({id, i, market}) => ({
    id,
    type: i.type,
    price: {...i.price},
    lotSize: i.lotSize,
    currency: i.currency,
    name: i.name,
    market,
}));

export const saveTradeDataToLocalStorage = (
    data: NormalizedModel[],
): void => {
    localStorage.setItem('tradeData', JSON.stringify(data));
};

export const getTradeDataFromLocalStorage = (): NormalizedModel[] | undefined => {
    const tradeData: string | null = localStorage.getItem('tradeData');

    return tradeData ? JSON.parse(tradeData) : undefined;
};

export const getFilterField = (value: string): FilteredField => {
    const isType = ["PRIVATE", "OFFCHAIN", "ONCHAIN"].some((type) => isPartialStringMatch(type, value));

    return isType ? "type" : "name";
};

export const getFilteredAndSortedTradeData = (
    data: NormalizedModel[],
    value: string,
): NormalizedModel[] => {
    const filterField: FilteredField = getFilterField(value);
    const filteredData: NormalizedModel[] = data.filter((item) => isPartialStringMatch(item[filterField], value));

    filteredData.sort((a, b) => {
        const marketPriorityA = marketPriority[a.market];
        const marketPriorityB = marketPriority[b.market];

        if (marketPriorityA !== marketPriorityB) {
            return Number(marketPriorityA) - Number(marketPriorityB);
        } else {
            const aPriceDiff = Math.abs(a.price.high - a.price.lastTradedPrevious);
            const bPriceDiff = Math.abs(b.price.high - b.price.lastTradedPrevious);

            return aPriceDiff - bPriceDiff;
        }
    });

    return filteredData;
};

export const getTradeInfoGridData = (
    data: NormalizedModel[],
) => {
    const result = [];

    for (const {name, type, market, price: {lastTradedPrevious}, lotSize} of data) {

        result.push([
            `${name}_${type}`,
            market,
            lastTradedPrevious * Number(lotSize),
            lastTradedPrevious,
        ]);
    }

    return result;
}

export const getPriceColor = (data: any) => {
    const lastTradedPrevious = data[3];
    const price = data[2];

    if (price < lastTradedPrevious) {
        return 'red';
    } else if (price > lastTradedPrevious) {
        return 'green';
    } else {
        return 'gray';
    }
};
