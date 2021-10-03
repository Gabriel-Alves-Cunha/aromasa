import { NextApiRequest, NextApiResponse } from "node_modules/next";
import nodemailer from "nodemailer";

import { axiosInstance } from "utils/axiosInstance";
import { envVariables } from "utils/env";
import { json2str } from "utils/json2str";

const contactEmailPassword = envVariables.contactEmailPassword;
const contactEmail = envVariables.contactEmail;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("\nEntered 'pages/api/payment/[id].ts'\n");

	try {
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
				text: "Link para o recibo: ",
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

		return res.status(200).json({});
	} catch (err: any) {
		return res.status(500).json({
			message: "Error on 'pages/api/payment/[id].ts': " + json2str(err),
		});
	}
}
