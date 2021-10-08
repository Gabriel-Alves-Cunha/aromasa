import type { FrenetForm } from "components/CheckoutCardForProduct/helperForCheckout";
import type {
	CreatePreferencePayload,
	PreferencePayer,
	PreferenceItem,
} from "mercadopago/models/preferences/create-payload.model";

import { NextApiRequest, NextApiResponse } from "node_modules/next";
import mercadopago from "mercadopago";

import { envVariables } from "utils/env";
import { json2str } from "utils/json2str";

mercadopago.configure({
	access_token: envVariables.mercadoPagoAccessToken,
	sandbox: process.env.NODE_ENV === "development",
});

export default async function talkToServer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const back_url = req.headers.origin + "/payment-result";

	switch (req.method) {
		case "POST":
			try {
				const itemsFromClientSide: PreferenceItem[] = req.body.items;
				const payer: PreferencePayer = req.body.payer;
				const frete: FrenetForm = req.body.formData;

				// const registerNewClientOnFrenet =
				// 	await axios.post<ResponseRegisterNewClientOnFrenet>(
				// 		"http://api.frenet.com.br/partner/register",
				// 		frete,
				// 		{
				// 			headers: {
				// 				"x-partner-token": envVariables.frenetToken,
				// 				"Content-Type": "application/json",
				// 			},
				// 		}
				// 	);
				// const frenetToken = registerNewClientOnFrenet.data.Token;

				// if (!frenetToken)
				// 	return res.status(400).json({
				// 		message: "registerNewClientOnFrenet failed.",
				// 		data: registerNewClientOnFrenet,
				// 	});

				// mercado pago /////////////////////////////////////////
				const preference: CreatePreferencePayload = {
					items: [
						...itemsFromClientSide,
						{
							unit_price: parseFloat(frete.total) || 100, // `|| 100` is for testing.
							currency_id: "BRL",
							title: "Frete",
							quantity: 1,
						},
					],
					statement_descriptor: "Aromasa Decor",
					binary_mode: true,
					// payer,
					payment_methods: {
						default_installments: 1,
						installments: 3,
					},
					back_urls: {
						success: back_url,
						pending: back_url,
						failure: back_url,
					},
				};

				const {
					body: { id },
				} = await mercadopago.preferences.create(preference);

				// Este valor substituirá a string "<%= global.id %>" no seu HTML
				// @ts-ignore
				global.id = id;

				return res.status(200).json({ id });
			} catch (error: any) {
				console.error(error);

				return res.status(error.statusCode || 500).json({
					message:
						"Error on POST method in 'pages/api/payment/index.tsx':" +
						json2str(error),
				});
			}
			break;
		case "GET":
			return res.status(405).end("Method not made yet!");
			break;
		default:
			return res.status(405).end("Method Not Allowed");
			break;
	}
}

type ResponseRegisterNewClientOnFrenet = {
	Success: boolean;
	Message?: string;
	Token?: string;
};
