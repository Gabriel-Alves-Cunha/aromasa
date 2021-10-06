import { useRouter } from "next/router";
import { useState } from "react";
import { Image } from "cloudinary-react";

import { Loading, Header, LayoutWithFooter, Cart } from "components";
import { envVariables } from "utils/env";

import { Wrapper } from "styles/pages/payment";

const contactEmail = envVariables.contactEmail;

export default function Result() {
	const {
		query: {
			collection_status,
			// merchant_order_id,
			// collection_id,
			// preference_id,
			// payment_id,
		},
	} = useRouter();

	console.log("collection_status =", collection_status);

	const [successAndLoading, setSuccessAndLoading] = useState({
		success: collection_status === "aproved",
		loading: false,
	});

	// useEffect(() => {
	// 	(async function talkToServer() {
	// 		try {
	// 			const { data } = await axiosInstance.get(`/api/payment/${payment_id}`);
	// 			console.log("\nThe data =", data);
	// 			data
	// 				? setSuccessAndLoading({ success: true, loading: false })
	// 				: setSuccessAndLoading({ success: false, loading: true });
	// 		} catch (error) {
	// 			console.error(error);
	// 			setSuccessAndLoading({ success: false, loading: false });
	// 		}
	// 	})();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// return <Success />;
	if (successAndLoading.loading) return <Loading_ />;
	else if (successAndLoading.success && !successAndLoading.loading)
		return <Success />;
	else if (!successAndLoading.success && !successAndLoading.loading)
		return <Error />;
}

function Success() {
	return (
		<Wrapper>
			<Header>
				<Cart />
			</Header>

			<section>
				<Image
					src="https://res.cloudinary.com/aromasa-decor/image/upload/v1633532414/pexels-alleksana-7248762_krxinr.jpg"
					alt="Foto de alleksana no Pexels. Muito obrigado por comprar conosco!"
					className="thanks"
					quality="auto"
				/>
				<p>
					<span>Muito obrigado por comprar conosco!</span>
					{"\n"}Se tiver quaisquer dúvidas, por favor,
					<a href={`mailto:${contactEmail}`}>entre em contato.</a>
				</p>
			</section>
		</Wrapper>
	);
}

function Error() {
	return (
		<Wrapper>
			<Header>
				<Cart />
			</Header>

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
			<Header>
				<Cart />
			</Header>

			<Loading />
		</Wrapper>
	);
}

Result.getLayout = LayoutWithFooter;
