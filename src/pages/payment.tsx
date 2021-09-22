import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";

import { Loading, Header, getLayout } from "components";
import { axiosInstance } from "hooks/useAxios";
import { envVariables } from "utils/env";

// import Error500_svg from "public/images/Error_500.svg";

const contactEmail = envVariables.contactEmail;

export default function Result() {
	const {
		query: { session_id: sessionId },
	} = useRouter();

	const [success, setSuccess] = useState(false);

	useEffect(() => {
		(async function talkToServer() {
			try {
				const { data } = await axiosInstance.get(
					`/api/payment/${sessionId}` as "api/payment/:id"
				);

				console.log("\nThere is data: ", data);
				setSuccess(true);
			} catch (error) {
				console.error(error);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	success ? <Success /> : <Error />;
	return <Loading_ />;
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

function Error() {
	return (
		<>
			<Header />

			{/* <Image src={Error500_svg} alt="Ocorreu um erro no servidor!" /> */}
		</>
	);
}

function Loading_() {
	return (
		<>
			<Header />

			<Loading />
		</>
	);
}

Result.getLayout = getLayout;
