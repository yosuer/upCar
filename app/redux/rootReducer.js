import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer });

export default rootReducer;