import {State} from 'redux/state/types';
import {NormalizedModel, SearchCache} from './tradeInfo.types';

export const isTradeInfoLoading = (state: State): boolean => state.tradeInfo.isLoading;
export const getTradeInfoData = (state: State): NormalizedModel[] | undefined => state.tradeInfo.data;
export const getSearchCache = (state: State): SearchCache | undefined => state.tradeInfo.searchCache;
