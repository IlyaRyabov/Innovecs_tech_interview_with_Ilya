import {combineReducers} from 'redux';
import {tradeInfo} from 'modules/tradeInfo/tradeInfo.reducer';

const reducers = {
    tradeInfo,
};

export const rootReducer = combineReducers(reducers);
