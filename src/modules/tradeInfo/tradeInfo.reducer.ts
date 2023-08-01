import {TradeInfoAction, TradeInfoState} from './tradeInfo.types';
import {TradeInfo} from './tradeInfo.contants';
import {getTradeDataFromLocalStorage} from './tradeInfo.helpers';

const initialState: TradeInfoState = {
    isLoading: false,
    data: getTradeDataFromLocalStorage(),
    searchCache: undefined,
    errorText: undefined,
};

export const tradeInfo = (
    state: TradeInfoState = initialState,
    action: TradeInfoAction,
) => {
    switch (action.type) {
        case TradeInfo.SetIsLoading:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case TradeInfo.SetData:
            return {
                ...state,
                data: action.data,
            }
        case TradeInfo.SetSearchCache:
            return {
                ...state,
                searchCache: action.data,
            }
        case TradeInfo.SetError:
            return {
                ...state,
                errorText: action.error,
            }
        default:
            return state;
    }
}
