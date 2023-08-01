import {SagaIterator} from "redux-saga";
import {takeEvery, delay, put, call, select} from 'redux-saga/effects';
import dataSource from './dataSource.json';
import {TradeInfo} from './tradeInfo.contants';
import {
    getFilteredAndSortedTradeData,
    getTradeDataFromLocalStorage,
    isTradeInfoDataCachedByQuery,
    normalizeTradeData,
    saveTradeDataToLocalStorage,
} from './tradeInfo.helpers';
import {GetFilteredAndSortedTradeData, Model, NormalizedModel, SearchCache} from './tradeInfo.types';
import {setIsLoading, setSearchCache, setTradeInfoData, setTradeInfoError} from './tradeInfo.actions';
import {getSearchCache, getTradeInfoData} from "./tradeInfo.selectors";

export function* fetchTradeInfoDataIfNeeded(): SagaIterator<void> {
    try {
        const cachedTradeInfoData: NormalizedModel[] | undefined = yield call(getTradeDataFromLocalStorage);

        if (cachedTradeInfoData) {
            yield put(setTradeInfoData(cachedTradeInfoData));
            return;
        }

        yield call(fetchTradeInfoData);
    } catch(error) {
        yield put(setTradeInfoError('Error'));
    }
}

export function* fetchTradeInfoData(): SagaIterator<void> {
    try {
        yield put(setIsLoading(true));
        yield delay(2000);

        const data: NormalizedModel[] = yield call(normalizeTradeData, dataSource as Model[]);

        yield put(setTradeInfoData(data));
        yield call(saveTradeDataToLocalStorage, data);
    } catch(e) {
        yield put(setTradeInfoError('Error'));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* getFilteredAndSortedData({query}: GetFilteredAndSortedTradeData): SagaIterator<void> {
    try {
        const tradeInfoData: NormalizedModel[] = yield select(getTradeInfoData);
        const searchCache: SearchCache = yield select(getSearchCache);

        if (query.length <= 2) {
            yield put(setTradeInfoData(getTradeDataFromLocalStorage() || tradeInfoData)); // TODO
        } else if (searchCache?.[query]) {
            yield put(setTradeInfoData(searchCache[query]));
        } else {
            const filteredAndSortedTradeData: NormalizedModel[] = yield call(getFilteredAndSortedTradeData, tradeInfoData, query);

            yield put(setTradeInfoData(filteredAndSortedTradeData));

            if (filteredAndSortedTradeData.length && !isTradeInfoDataCachedByQuery(searchCache, query)) {
                yield put(setSearchCache({[query]: filteredAndSortedTradeData}));
            }
        }
    } catch(e) {
        put(setTradeInfoError('Error'));
    }
}

export function* watchTradeInfo(): SagaIterator<void> {
    yield takeEvery(TradeInfo.FetchData, fetchTradeInfoDataIfNeeded);
    yield takeEvery(TradeInfo.GetFilteredAndSortedData, getFilteredAndSortedData);
}
