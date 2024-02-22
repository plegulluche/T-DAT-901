import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import { searchReducer } from './search.reducer';

export default combineReducers({
  userReducer,
  searchReducer,
});