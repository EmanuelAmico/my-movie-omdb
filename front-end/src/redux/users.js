import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import API_URL from "../config/env";
import generateAxios from "../utils/generateAxios";

//---------------------------------------------------------------------------//

// Action
const setUsers = createAction("SET_USERS");

const getUsers = createAsyncThunk("GET_USERS", async (token) => {
  try {
    const server = generateAxios(token);
    const response = await server.get(`${API_URL}/api/users`);
    const users = response.data;
    return users;
  } catch (error) {
    console.log(error);
  }
});

// Reducer
const usersReducer = createReducer([], {
  [setUsers]: (state, action) => action.payload,
  [getUsers.fulfilled]: (state, action) => action.payload,
});

//---------------------------------------------------------------------------//

export { setUsers, getUsers, usersReducer };
