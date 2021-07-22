import { mutate as mutateGlobal } from "swr";
import axios from "axios";

import { useCallback } from "react";
import { useAxios } from "../../hooks/useAxios";

export default function ControllPanel() {
	// const { data, mutate, error } = useAxios<>();

	// const handleNameChange = useCallback(
	// 	(id: number, newName: string) => {
	// 		const url = `users/${id}`;
	// 		axios.put(url, { name: newName });

	// 		const updatedUsers = data?.map(user => {
	// 			if (user.id === id) return { ...user, name: newName };

	// 			return user;
	// 		});

	// 		mutate(updatedUsers, false); // `false` não vai fazer uma nova chamada no api
	// 		mutateGlobal(url, { id, name: newName }); // mutate all cache :)
	// 	},
	// 	[data, mutate]
	// );

	return <div></div>;
}
