/*
  This custom hook listens for new messages from the socket and updates the Redux store accordingly.
  It imports the useSocketContext hook to access the socket instance from the SocketContext.
  It also imports useDispatch and useSelector hooks from react-redux for dispatching actions and selecting state from the Redux store.
*/

import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { setMsg } from "@/lib/Features/Conversations/conversationSlice";
import { setUserData } from "@/lib/Features/UsersData/userDataSlice";

const useListenMessages = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const msg = useSelector((state) => state.conversation.value);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);
      // sound.play();
      msg && msg.length > 0
        ? dispatch(setMsg([...msg, newMessage]))
        : dispatch(setMsg([newMessage]));
      // dispatch(setSendMsg());
    });

    return () => socket?.off("newMessage");
  }, [socket, setMsg, msg]);
};
export default useListenMessages;
