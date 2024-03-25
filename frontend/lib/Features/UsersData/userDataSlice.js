"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    removeUserData: (state) => {
      state.value = initialState;
    },
    setUserData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { removeUserData, setUserData } = userDataSlice.actions

export default userDataSlice.reducer;