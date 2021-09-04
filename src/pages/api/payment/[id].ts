import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import axios from "axios";

import { envVariables } from "storage/env";

const contactEmailPassword = envVariables.contactEmailPassword;
const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});
const contactEmail = envVariables.contactEmail;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("\nEntered 'pages/api/payment/[id].ts'\n");

	const id = req.query.id as string;
	console.log("\nsession_id =", id);

	if (!id.startsWith("cs_")) throw Error("Incorrect CheckoutSession ID.");

	try {
		const checkout_session = await stripe.checkout.sessions.retrieve(id, {
			expand: ["payment_intent"],
		});

		// console.log("\nCheckout_session =", checkout_session);

		if (checkout_session.payment_status === "paid") {
			const urlPromises = (
				checkout_session.payment_intent as Stripe.PaymentIntent
			).charges.data
				.map(data => data.receipt_url)
				.map(url => url && axios.get(url));

			console.log(
				"\n\nurl =",
				(
					checkout_session.payment_intent as Stripe.PaymentIntent
				).charges.data.map(charge => charge.receipt_url)
			);

			const htmls = await Promise.allSettled(urlPromises).then(results =>
				//@ts-ignore
				results.map(res => res.status === "fulfilled" && res.value.data)
			);
			// console.log("\n\n[HTML] d.value:\n\n", htmls.join(", "));

			const mailSender = nodemailer.createTransport({
				service: "hotmail",
				secure: false, // true for 465, false for other ports
				port: 587,
				auth: {
					pass: contactEmailPassword,
					user: contactEmail,
				},
			});

			mailSender.sendMail(
				{
					to: [contactEmail, checkout_session.customer_details?.email ?? ""],
					subject: "Recibo de pagamento da Aromasa Decor.",
					html: htmls.join(", "),
					from: contactEmail,
					text:
						"Link para o recibo: " +
						(
							checkout_session.payment_intent as Stripe.PaymentIntent
						).charges.data.map(charge => charge.receipt_url),
				},
				(err, info) => {
					if (err) {
						console.error(err);
						return;
					}

					console.log(
						"\nResponse from nodemailer [email sent :) ]: ",
						info.response
					);
				}
			);
		}

		return res.status(200).json(checkout_session);
	} catch (err: any) {
		return res
			.status(500)
			.json({
				message: "Error on 'pages/api/payment/[id].ts': " + err.message,
			});
	}
}
