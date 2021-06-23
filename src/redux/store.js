import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer, specificMovieReducer } from './movies';
import { userReducer } from './user';

const store = configureStore({
  reducer: { //esto representa a la store de estados
    movies: moviesReducer,
    selectedMovie: specificMovieReducer,
    user: userReducer,
  },
});

export default store