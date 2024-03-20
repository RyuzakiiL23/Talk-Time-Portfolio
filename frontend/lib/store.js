"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./Features/Counter/counterSlice";
import authReducer from "./Features/Auth/authSlice";
import conversationReducer from "./Features/Conversations/conversationSlice";
import userDataReducer from "./Features/UsersData/userDataSlice";
import interlocuteurReducer from "./Features/Interlocuteur/interlocuteurSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  conversation: conversationReducer,
  userData: userDataReducer,
  interlocuteur: interlocuteurReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });