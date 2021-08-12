import { useEffect } from "react";
import { useRouter } from "next/router";

import { envVariables } from "../../storage/env";
import { getLayout } from "../../components/Layout";
import { useAxios } from "../../hooks/useAxios";

const contactEmail = envVariables.contactEmail;

function Result() {
	const {
		query: { session_id: sessionId },
	} = useRouter();
	console.log("\nsessionId =", sessionId);

	const { data_: data, error } = useAxios(
		"GET",
		`/api/payment/${sessionId}` as "api/payment/:id"
	);

	console.log(contactEmail);

	useEffect(() => {
		if (data) {
			console.log("\nThere is data: ", data);
		}
	}, [data]);

	if (error) return <div>failed to load</div>;

	return (
		<div>
			<h1>Checkout Payment Result</h1>
			<h2>
				Status:{" "}
				{JSON.stringify(data?.payment_intent?.status, null, 2) ?? "Loading..."}
			</h2>
			<h3>CheckoutSession response:</h3>
			<div>{JSON.stringify(data, null, 2) ?? "Loading..."}</div>
		</div>
	);
}

function Loading() {
	return (
		<div></div>
	)
}

function Success() {
	return (
		<div style={{ marginTop: "90px" }}>
			<p>
				We appreciate your business! If you have any questions, please email
				<a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
			</p>
		</div>
	);
}

function Cancel() {
	return (
		<p>
			Forgot to add something to your cart? Shop around then come back to pay!
		</p>
	);
}

Result.getLayout = getLayout;

export default Result;
