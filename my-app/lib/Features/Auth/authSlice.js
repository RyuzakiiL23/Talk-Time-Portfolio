"use client";

import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("chat-user");
const parsedUser = storedUser !== undefined ? JSON.parse(storedUser) : null;

const initialState = {
  value: parsedUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authentificated: (state) => {
      state.value = JSON.parse(localStorage.getItem("chat-user"));
    },
    notAuthentificated: (state) => {
      state.value = null;
    },
  },
});

export const { authentificated, notAuthentificated } = authSlice.actions

export default authSlice.reducer;