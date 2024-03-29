/*
  This file contains the Redux slice responsible for managing user data-related state.
  It defines actions for setting and removing user data.
*/

"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

// Slice for user data management
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // Reducer function to remove user data
    removeUserData: (state) => {
      state.value = initialState;
    },

    // Reducer function to set user data
    setUserData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Extracting action creators
export const { removeUserData, setUserData } = userDataSlice.actions

export default userDataSlice.reducer;