/*
  This file contains the Redux slice responsible for managing conversation-related state.
  It defines actions for setting and removing messages in the conversation.
*/

"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

// Slice for conversation management
export const conversationSlice = createSlice({
  name: "counversation",
  initialState,
  reducers: {

    // Reducer function to remove all messages from the conversation
    removeMsg: (state) => {
      state.value = initialState;
    },

    // Reducer function to remove all messages from the conversation
    setMsg: (state, action) => {
      state.value = action.payload;
    },
  },
});


// Extracting action creators
export const { removeMsg, setMsg } = conversationSlice.actions

export default conversationSlice.reducer;