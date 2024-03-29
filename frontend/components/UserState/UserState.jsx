/*
  This component manages the user state and renders the appropriate component based on authentication status and login/signup state.
*/

'use client'
import React from "react";
import { useSelector } from "react-redux";

import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function UserState() {
	const auth = useSelector((state) => state.auth.value);
	// const [logIn, setLogIn] = useState(false);
	const [log, setLog] = useState(true);

   // Function to toggle between login and signup
	const changeLog = (val) => {
		setLog(val);
	};

  // Rendering appropriate component based on authentication status and login/signup state
	return (
    <div className="h-screen flex justify-center items-center">
      {auth ? (
        <Home />
      ) : log ? (
        <Login changeLog={changeLog} />
      ) : (
        <SignUp changeLog={changeLog} />
      )}
      <Toaster />
    </div>
  );
}
