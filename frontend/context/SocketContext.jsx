/*
  This module creates a SocketContext using React's Context API to manage socket connections.
  It provides a SocketContextProvider component to wrap around the application, allowing access to socket and onlineUsers state.
  It also exports a custom hook useSocketContext for consuming the SocketContext.
*/

"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";


// const authUser = JSON.parse(localStorage.getItem("chat-user")) || null;


const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const authUser =useSelector((state)=> state.auth.value);
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	
	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:8080", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) { // // If user is not authenticated, close the socket connection
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	// Provide the socket instance and online users to the context
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
