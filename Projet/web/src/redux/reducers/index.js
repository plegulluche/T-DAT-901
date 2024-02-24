import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import { searchReducer } from './search.reducer';
import { dateReducer } from './dateReducer';


export default combineReducers({
  userReducer,
  searchReducer,
  dateReducer,

});