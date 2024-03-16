import { useDispatch, useSelector } from "react-redux";
import {
	notAuthentificated,
} from "../lib/Features/Auth/authSlice";

const useLogout = () => {

	const logout = async () => {
		try {
			const res = await fetch("http://localhost:8080/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			dispatch(notAuthentificated());
		} catch (error) {
			toast.error(error.message);
		}
	};
	const authentification = useSelector((state) => state.auth.value);
	const dispatch = useDispatch();

	return logout;
};
export default useLogout;
