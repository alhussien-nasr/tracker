import {createSlice, current} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
const date = new Date();
const initialState = {
  list: [],
  loading: false,
};

export const routineSlice = createSlice({
  name: 'Routine',
  initialState,
  reducers: {
    add: (state, action) => {
      let options = {weekday: 'long', month: 'long', day: 'numeric'};
      let hour = new Date().getHours();
      let date = new Date().toLocaleDateString('ar-EG', options);

      const workoutTime =
        hour >= 12 && hour <= 17
          ? 'Afternoon Workout'
          : hour > 17 && hour <= 20
          ? 'Evening Workout'
          : 'Night Workout';

      state.list.push({
        subName: workoutTime,
        id: action.payload,
        name: '',
        bodyWeight: '',
        exercise: [],
        note: '',
        date,
      });
    },
    addExercise: (state, action) => {
      const {id, ex} = action.payload;
      console.log(id, ex);
      state.list.map(i =>
        i.id === id
          ? i.exercise.push({name: ex, sets: [{set: '', weight: '', note: ''}]})
          : i,
      );
    },
    addRepAndWeight: (state, action) => {
      const {val, id, type, index, setIndex} = action.payload;
      console.log(
        state.list.map(i =>
          i.id === id ? (i.exercise[index].sets[setIndex].set = val) : i,
        ),
        'addset',
      );

      switch (type) {
        case 'addset':
          state.list.map(i =>
            i.id === id ? (i.exercise[index].sets[setIndex].set = val) : i,
          );

          break;
        case 'addWeight':
          state.list.map(i =>
            i.id === id ? (i.exercise[index].sets[setIndex].weight = val) : i,
          );
          break;

        default:
          break;
      }
    },
    addDateAndName: (state, action) => {
      const {name, type, id, bodyWeight, date} = action.payload;
      switch (type) {
        case 'name':
          state.list.map(i => (i.id === id ? (i.name = name) : i));
          break;
        case 'bodyWeight':
          state.list.map(i => (i.id === id ? (i.bodyWeight = bodyWeight) : i));
          break;
        case 'date':
          state.list.map(i => (i.id === id ? (i.date = date) : i));
          break;

        default:
          break;
      }
    },
    addSet: (state, action) => {
      const {id, index, setIndex} = action.payload;
      console.log(id, setIndex);
      state.list.map(i => {
        i.id === id
          ? i.exercise[index].sets.push({
              set: '',
              weight: '',
              note: '',
            })
          : i;
      });
    },
    Delete: (state, action) => {
      const {type, id, index, setIndex, name} = action.payload;
      console.log(current(state), 'ccc');

      console.log(id, index);

      switch (type) {
        case 'exercise':
          state.list.map(i => {
            i.id === id
              ? (i.exercise = i.exercise.filter((item, idx) => idx !== index))
              : i;
          });
          break;

        case 'workOut':
          console.log(current(state), id);
          state.list = state.list.filter(i => i.id !== id);

        default:
          break;
      }
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  add,
  addExercise,
  addRepAndWeight,
  addDateAndName,
  addSet,
  Delete,
} = routineSlice.actions;

export default routineSlice.reducer;
