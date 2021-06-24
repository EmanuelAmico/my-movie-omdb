import { createAction, createReducer } from "@reduxjs/toolkit";

//---------------------------------------------------------------------------//

// Action
const setUsers = createAction("SET_USERS")

// Reducer
const usersReducer = createReducer([], {
  [setUsers] : (state, action) => action.payload
})

//---------------------------------------------------------------------------//


export { setUsers, usersReducer }
