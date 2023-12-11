import { createSlice } from '@reduxjs/toolkit';
import { PaginationState } from '../../model/Utils';

const initialState: PaginationState = {
  current: 0,
  perPage: 10,
};
const slice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    initializeState: (state) => {
      return Object.assign({}, state, initialState);
    },
    setCurrentPage: (state, action) => {
      return Object.assign({}, state, { current: action.payload });
    },
    setPerPage: (state, action) => {
      return Object.assign({}, state, { perPage: action.payload });
    },
  },
});

export default slice.reducer;

export const { initializeState, setCurrentPage, setPerPage } = slice.actions;
