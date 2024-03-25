"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const interlocuteurSlice = createSlice({
  name: "interlocuteur",
  initialState,
  reducers: {
    removeInterlocuteur: (state) => {
      state.value = initialState;
    },
    setInterlocuteur: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { removeInterlocuteur, setInterlocuteur } = interlocuteurSlice.actions

export default interlocuteurSlice.reducer;