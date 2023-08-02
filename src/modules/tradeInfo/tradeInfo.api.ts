import {NormalizedModel, TradeInfoModel} from './tradeInfo.types';
import {normalizeTradeData} from './tradeInfo.helpers';

export const fetchTradeInfo = (
    dataSource: TradeInfoModel[],
): Promise<NormalizedModel[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(normalizeTradeData(dataSource));
        }, 1500);
    });
}
