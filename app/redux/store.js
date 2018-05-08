import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducers from './rootReducer';

const enhancer = compose(applyMiddleware(thunk, logger));

export default createStore(reducers, enhancer);