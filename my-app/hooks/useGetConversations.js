import { useEffect, useState } from "react";

const useGetConversations = () => {
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				console.log(error);
			}
		};

		getConversations();
	}, []);

	return { conversations };
};
export default useGetConversations;
