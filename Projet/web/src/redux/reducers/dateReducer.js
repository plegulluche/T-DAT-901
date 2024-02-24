import { SET_START_DATE } from '../actions/dateActions';

const initialState = {
  startDate: null,
};

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    default:
      return state;
  }
};
