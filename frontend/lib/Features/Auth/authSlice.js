"use client";

import { createSlice } from "@reduxjs/toolkit";

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