import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import getRootReducer from '../reducers'

export default function getStore(navReducer) {
  const store = createStore(
    getRootReducer(navReducer),
    undefined,
    applyMiddleware(thunkMiddleware, createLogger)
  );

  return store;
}