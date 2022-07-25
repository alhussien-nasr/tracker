import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Abs: ['crunches', 'leg raises'],
  Back: [],
  Chest: [],
};

export const counterSlice = createSlice({
  name: 'Excersise',
  initialState,
  reducers: {
    add: (state, action) => {
      const {item, text} = action.payload;

      state[item].push(text);
    },
  },
});
// Action creators are generated for each case reducer function
export const {add} = counterSlice.actions;

export default counterSlice.reducer;

const e = {
  Abs: [],
  Back: [],
  Chest: [],
};
