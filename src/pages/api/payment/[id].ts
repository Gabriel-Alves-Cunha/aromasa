import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { envVariables } from "../../../storage/env";

const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("\nEntered 'api/payment/[id].ts'\n");
	// console.log("\nreq =", req);

	const id = req.query.id as string;
	// console.log("\nid =", id);

	try {
		if (!id.startsWith("cs_")) throw Error("Incorrect CheckoutSession ID.");

		const checkout_session = await stripe.checkout.sessions.retrieve(id, {
			expand: ["payment_intent"],
		});

		res.status(200).json(checkout_session);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error on 'api/payment/[id].ts': " + err.message });
	}
}
