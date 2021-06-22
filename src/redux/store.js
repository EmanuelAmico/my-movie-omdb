import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer, specificMovieReducer } from './movies';

const store = configureStore({
  reducer: { //esto representa a la store de estados
    movies: moviesReducer,
    selectedMovie: specificMovieReducer,
  },
});

export default store