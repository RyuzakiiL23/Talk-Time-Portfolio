/*
  This file contains the Redux slice responsible for managing interlocuteur-related state.
  It defines actions for setting and removing the interlocuteur.
*/

"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

// Slice for interlocuteur management
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

// Extracting action creators
export const { removeInterlocuteur, setInterlocuteur } = interlocuteurSlice.actions

export default interlocuteurSlice.reducer;