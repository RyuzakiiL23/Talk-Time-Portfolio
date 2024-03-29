/*
  This file contains the Redux slice responsible for managing authentication-related state.
  It defines actions for setting authentication data, checking authentication status, and updating authentication status.
*/

"use client";

import { createSlice } from "@reduxjs/toolkit";

// Function to get initial state for authentication based on local storage
function getInitialState() {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("chat-user");
    const parsedUser = storedUser !== null ? JSON.parse(storedUser) : null;
    return { value: parsedUser };
  }
  return { value: null };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },

     // Reducer function to set authentication status to not authenticated
    authentificated: (state) => {
      if (typeof window !== "undefined") {
        state.value = JSON.parse(localStorage.getItem("chat-user"));
      }
    },
    notAuthentificated: (state) => {
      state.value = null;
    },
  },
});

export const { authentificated, notAuthentificated, setAuth } = authSlice.actions;

export default authSlice.reducer;