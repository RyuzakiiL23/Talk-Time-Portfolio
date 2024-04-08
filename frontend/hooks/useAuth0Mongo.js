import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../lib/Features/Auth/authSlice";

const useAuth0Mongo = (user) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuth = async () => {
      if (!user) return;
      const {email, picture, given_name, family_name, nickname:username} = user
      let email_verified = {email_verified: 'false'};
      if (user.email_verified) {
        email_verified.email_verified = 'true'
      } 
      try {
        const res = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email, picture, given_name, family_name, email_verified, username}),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("chat-user", JSON.stringify(data));
          dispatch(setAuth(data));
          console.log(data);

        } else {
          throw new Error(data.error || "Failed to sign up");
        }
      } catch (error) {
        console.error(error.message);
        // Dispatch an action to update Redux state with the error, if needed
        // dispatch(setError(error.message));
      }
    };

    fetchAuth();

    // Cleanup function if necessary
    // return () => { cleanup code };
  }, [dispatch, user]);
};

export default useAuth0Mongo;