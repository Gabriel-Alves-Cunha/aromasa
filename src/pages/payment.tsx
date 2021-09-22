import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from "cloudinary-react";

import { Loading, Header, getLayout } from "components";
import { axiosInstance } from "hooks/useAxios";
import { envVariables } from "utils/env";

import { Wrapper } from "styles/pages/payment";

const contactEmail = envVariables.contactEmail;

export default function Result() {
	const {
		query: { session_id },
	} = useRouter();

	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async function talkToServer() {
			try {
				const { data } = await axiosInstance.get(
					`/api/payment/${session_id}` as "api/payment/:id"
				);

				console.log("\nThere is data: ", data);
				setLoading(false);
				setSuccess(true);
			} catch (error) {
				console.error(error);
				setLoading(false);
				setSuccess(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// return <Success />;
	if (loading) return <Loading />;
	else if (success && !loading) return <Success />;
	else if (!success && !loading) return <Error />;
}

function Success() {
	return (
		<Wrapper>
			<Header />

			<div>
				<p>
					We appreciate your business! If you have any questions, please email
					<a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
				</p>
			</div>
		</Wrapper>
	);
}

function Error() {
	return (
		<Wrapper>
			<Header />

			<Image
				src="https://res.cloudinary.com/aromasa-decor/image/upload/v1632330726/Error_500_uv7srs.svg"
				alt="Ocorreu um erro no servidor!"
				className="error_img"
			/>
		</Wrapper>
	);
}

function Loading_() {
	return (
		<Wrapper>
			<Header />

			<Loading />
		</Wrapper>
	);
}

Result.getLayout = getLayout;
