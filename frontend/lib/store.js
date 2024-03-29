/*
  This file combines all reducers using combineReducers from Redux Toolkit.
  It creates the Redux store using configureStore from Redux Toolkit.
*/

"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/authSlice";
import conversationReducer from "./Features/Conversations/conversationSlice";
import userDataReducer from "./Features/UsersData/userDataSlice";
import interlocuteurReducer from "./Features/Interlocuteur/interlocuteurSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  userData: userDataReducer,
  interlocuteur: interlocuteurReducer,
  //add all your reducers here
},);

// Create the Redux store with the rootReducer
export const store = configureStore({
  reducer: rootReducer,

 });