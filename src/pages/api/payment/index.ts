import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { envVariables } from "../../../storage/env";

const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});

export default async function talkToServer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const pricesIdsAndquantities = req.body.products;
	console.log("\npricesIdsAndquantities =", pricesIdsAndquantities);

	switch (method) {
		case "POST":
			try {
				const redirect_url = `${req.headers.origin}/payment/result?session_id={CHECKOUT_SESSION_ID}`;

				const session = await stripe.checkout.sessions.create({
					line_items: pricesIdsAndquantities,
					payment_method_types: ["card"],
					success_url: redirect_url,
					cancel_url: redirect_url,
					mode: "payment",
				});

				res.json({ sessionId: session.id });
			} catch (error) {
				console.log(error);

				res
					.status(400)
					.json({ message: "Erro no método POST em /api/payment/index.tsx" });
			}
			break;
		default:
			res.json({
				error: "Entered default case! 'POST' is the only method supported.",
			});
			break;
	}
}
