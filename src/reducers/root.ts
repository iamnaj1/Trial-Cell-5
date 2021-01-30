import { combineReducers } from 'redux';

import charactersReducer from './Characters'; 

const rootReducer = combineReducers({
  character: charactersReducer, 
});

export default rootReducer;
