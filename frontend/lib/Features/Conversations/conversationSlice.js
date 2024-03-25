"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const conversationSlice = createSlice({
  name: "counversation",
  initialState,
  reducers: {
    removeMsg: (state) => {
      state.value = initialState;
    },
    setMsg: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { removeMsg, setMsg } = conversationSlice.actions

export default conversationSlice.reducer;