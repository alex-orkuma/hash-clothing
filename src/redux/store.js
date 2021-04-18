import { createStore, applyMiddleware } from 'redux';
import loggger from 'redux-logger';

import rootReducer from './root-reducer';
const middlewares = [loggger];

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;

