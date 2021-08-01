import { NextApiRequest, NextApiResponse } from "next";

import type { Shipment, Items } from "./index_types";
import { envVariables } from "../../../storage/env";
import mercadopago from "mercadopago";

export type ReqBody = {
	itemsThatWillBeBought: Items;
	shipmentDetails: Shipment;
};

export default async function talkToServer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// console.log("\nreq =", req);

	const { itemsThatWillBeBought, shipmentDetails }: ReqBody = req.body;
	console.log(itemsThatWillBeBought, shipmentDetails);

	const url = req.headers.referer?.replace("/payment", "");
	console.log("\nurl =", url);

	mercadopago.configure({
		sandbox: true,
		access_token: envVariables.mercadoPagoAccessToken,
	});

	const preference_id = await mercadopago.preferences
		.create({
			items: itemsThatWillBeBought,
			back_urls: {
				success: url,
				pending: url,
				failure: url,
			} /*
Através das back_urls serão retornados os seguintes parâmetros:
-> payment_id:	ID do pagamento do Mercado Pago.
-> status:	Estado do pagamento. Ex.: approved para um pagamento aprovado ou pending para um pagamento pendente.
-> external_reference:	Valor que foi enviado no momento da criação da preferência de pagamento.
-> merchant_order_id:	ID da ordem de pagamento gerada no Mercado Pago.
			*/,
			statement_descriptor: "Aromasa Decor",
			auto_return: "approved",
			binary_mode: true,
			payment_methods: {
				excluded_payment_types: [
					{
						id: "ticket",
					},
				],
				installments: 1,
			},
			shipments: shipmentDetails,
		})
		.then(res => res.body.id);

	// res.setHeader("Access-Control-Allow-Origin", "*");

	return res.json({ preference_id });
}
