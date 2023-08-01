import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './state/reducers';
import {rootSaga} from './sagas';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    ),
);

sagaMiddleware.run(rootSaga);
