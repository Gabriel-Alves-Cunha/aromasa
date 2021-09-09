import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";

import { Loading, Header, getLayout } from "components";
import { axiosInstance } from "hooks/useAxios";
import { envVariables } from "utils/env";

// import Error500_svg from "public/images/Error_500.svg";

const contactEmail = envVariables.contactEmail;

function Result() {
	const {
		query: { session_id: sessionId },
	} = useRouter();

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		(async function talkToServer() {
			console.log("sessionId =", sessionId);
			const { data } = await axiosInstance.get(
				`/api/payment/${sessionId}` as "api/payment/:id"
			);

			if (data) {
				console.log("\nThere is data: ", data);

				setSuccess(true);
			} else setError(true);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error)
		return (
			<>
				<Header />

				{/* <Image src={Error500_svg} alt="Ocorreu um erro no servidor!" /> */}
			</>
		);

	if (success) return <Success />;

	return (
		<>
			<Header />

			<Loading />
		</>
	);
}

function Success() {
	return (
		<>
			<Header />

			<div style={{ marginTop: "90px" }}>
				<p>
					We appreciate your business! If you have any questions, please email
					<a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
				</p>
			</div>
		</>
	);
}

Result.getLayout = getLayout;

export default Result;
