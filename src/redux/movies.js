import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from 'axios'

//---------------------------------------------------------------------------//

// Action
const getMovies = createAsyncThunk('GET_MOVIES', (title) => {
   return axios.get(`http://www.omdbapi.com/?apikey=a475d412&s=${title}`)
            .then(res => res.data)
            .then(movies => movies.Search ? movies.Search : [])
            .catch(error => message.error(`Error: ${error.message}`, 5))
})

// Reducer
const moviesReducer = createReducer([], {
    [getMovies.fulfilled]: (state, action) =>  action.payload
})

//---------------------------------------------------------------------------//

// Action
const getSpecificMovie = createAsyncThunk('GET_SPECIFIC_MOVIE', (imdbID) => {
  return axios.get(`http://www.omdbapi.com/?apikey=a475d412&i=${imdbID}`)
           .then(res => res.data)
           .then(movie => movie)
           .catch(error => message.error(`Error: ${error.message}`, 5))
})

// Reducer
const specificMovieReducer = createReducer({}, {
  [getSpecificMovie.fulfilled]: (state, action) =>  action.payload
}) 
//TODO implementar que la movie sea vacia cuando está pending así no aparece la movie anterior

//---------------------------------------------------------------------------//


export { getMovies, moviesReducer, getSpecificMovie, specificMovieReducer }; // action 
