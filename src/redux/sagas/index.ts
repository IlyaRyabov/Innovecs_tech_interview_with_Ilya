import {SagaIterator} from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import {watchTradeInfo} from 'modules/tradeInfo/tradeInfo.sagas';

export function* rootSaga(): SagaIterator<void> {
    yield all([
        fork(watchTradeInfo),
    ]);
}
