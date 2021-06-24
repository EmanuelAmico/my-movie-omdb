import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import generateAxios from "../utils/generateAxios";

//---------------------------------------------------------------------------//

// Action
const setUsers = createAction("SET_USERS")

const getUsers = createAsyncThunk('GET_USERS', async (user) => {
  try {
    const server = generateAxios(user.token)
    const users = await server.get('/users')
  } catch (error) {
    console.log(error)
  }
})

// Reducer
const usersReducer = createReducer([], {
  [setUsers] : (state, action) => action.payload
})

//---------------------------------------------------------------------------//


export { setUsers, usersReducer }
