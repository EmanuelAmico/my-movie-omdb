import { createAction, createReducer } from "@reduxjs/toolkit";

//---------------------------------------------------------------------------//

// Action
const setUser = createAction("SET_USER")

// Reducer
const userReducer = createReducer({isLoggedIn: !!localStorage.getItem('userToken'), token: localStorage.getItem('userToken')}, {
  [setUser] : (state, action) => action.payload
})

//---------------------------------------------------------------------------//


export { setUser, userReducer }

