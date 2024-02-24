// Action Types
export const SET_START_DATE = 'SET_START_DATE';

// Action Creators
export const setStartDate = (startDate) => ({
  type: SET_START_DATE,
  payload: startDate,
});
