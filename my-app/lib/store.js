"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./Features/Counter/counterSlice";
import authReducer from "./Features/Auth/authSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });