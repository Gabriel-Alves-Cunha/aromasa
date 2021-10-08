import type { ShipData } from "src/pages/checkout";

import { NextApiRequest, NextApiResponse } from "node_modules/next";
import axios from "axios";

import { envVariables } from "utils/env";
import { json2str } from "utils/json2str";

export default async function talkToServer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "POST":
			try {
				const shipData: ShipData = req.body;

				// get quote from Frenet:
				const { data } = await axios.post<Quote>(
					"http://api.frenet.com.br/shipping/quote",
					shipData,
					{
						headers: {
							"Content-Type": "application/json",
							token: envVariables.frenetToken,
							Accept: "application/json",
						},
					}
				);

				return res.status(200).json({ data });
			} catch (error: any) {
				console.error(error);

				return res.status(error.statusCode || 500).json({
					message:
						"Error on POST method in 'pages/api/payment/index.tsx':" +
						json2str(error),
				});
			}
			break;
		default:
			return res.status(405).end("Method Not Allowed");
			break;
	}
}

export type Quote = {
	ShippingSevicesArray: ShippingSevice[];
	Timeout: number;
};

type ShippingSevice = {
	OriginalShippingPrice: string;
	OriginalDeliveryTime: string;
	ServiceDescription: string;
	ShippingPrice: string;
	DeliveryTime: string;
	CarrierCode: string;
	ServiceCode: string;
	Carrier: string;
	Error: boolean;
	Msg: string;
};
