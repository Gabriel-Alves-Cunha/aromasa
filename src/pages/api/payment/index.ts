import { NextApiRequest, NextApiResponse } from "node_modules/next";
import { getSession } from "next-auth/client";
import Stripe from "stripe";

import { envVariables } from "utils/env";
import { assert } from "utils/assert";
import { json2str } from "utils/json2str";

const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});

export default async function talkToServer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "POST":
			try {
				const userSession = await getSession();
				assert(userSession, "There is no userSession!");
				const date = new Date().toISOString();

				const productsInfo = req.body.products;
				console.log("productsInfo =", productsInfo);
				console.log("req.body.metadata =", req.body.metadata);

				const shippingAsAProductForStripe = await stripe.products.create({
					name: `Frete para ${userSession.user?.name} na data: ${date}`,
				});
				const priceForShipping = await stripe.prices.create({
					product: shippingAsAProductForStripe.id,
					unit_amount: req.body.metadata,
					currency: "brl",
				});

				const session = await stripe.checkout.sessions.create({
					success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${req.headers.origin}/?canceled=true`,
					line_items: [
						...productsInfo,
						{
							price: priceForShipping.id,
							quantity: 1,
						},
					],
					payment_method_types: ["card"],
					submit_type: "pay",
					mode: "payment",
					locale: "pt-BR",
				});

				console.log(session.payment_intent);

				return res.json({ sessionId: session.id });
			} catch (error: any) {
				console.log(error);

				return res
					.status(error.statusCode || 500)
					.json(
						"Erro no método POST em 'pages/api/payment/index.tsx':" +
							json2str(error)
					);
			}
			break;
		default:
			return res.status(405).end("Method Not Allowed");
			break;
	}
}
