import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { message } from "antd";
import generateAxios from "../utils/generateAxios";


//---------------------------------------------------------------------------//

// Action
const getFavoriteMovies = createAsyncThunk('GET_FAVORITES', (user) => {
  const server = generateAxios(user.token)
  return server.get('/users/favorites')
            .then(res => res.data)
            .then(favoriteMovies => favoriteMovies)
            .catch(error => message.error(`Error: ${error.message}`, 5))
})

// Action
const setFavoriteMovies = createAction('SET_FAVORITE_MOVIES')

// Reducer
const favoriteMoviesReducer = createReducer([], {
    [getFavoriteMovies.fulfilled]: (state, action) =>  action.payload,
    [setFavoriteMovies]: (state, action) => action.payload
})
//TODO Para que sirve state en el reducer????
//---------------------------------------------------------------------------//
export { getFavoriteMovies, setFavoriteMovies, favoriteMoviesReducer }