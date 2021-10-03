import { NextApiRequest, NextApiResponse } from "node_modules/next";

import { axiosInstance } from "utils/axiosInstance";
import { envVariables } from "utils/env";
import { json2str } from "utils/json2str";

export default async function talkToServer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("req =", req);

	switch (req.method) {
		case "POST":
			try {
				const productsInfo = req.body.products;
				console.log("productsInfo =", productsInfo);
				console.log("req.body.shipData =", req.body.shipData);

				// Getting authorization /////////////////////////////////////////////
				const authOptions: GetAuthRequestFromUser = {
					redirect_uri: envVariables.sumupRedirectUri,
					client_id: envVariables.sumupClientId,
					response_type: "code",
					scope: "payments",
				};
				const auth = await axiosInstance.get<{}>(
					"https://api.sumup.com/authorize",
					{ data: authOptions }
				);
				console.log("auth =", auth);

				// Getting token //////////////////////////////////////////////////////
				const tokenOptions: TokenRequest = {
					client_secret: envVariables.sumupClientSecret,
					client_id: envVariables.sumupClientId,
					grant_type: "authorization_code",
					code: "something",
				};
				const token = await axiosInstance.post<
					TokenResponse_200 | TokenResponse_400
				>("https://api.sumup.com/token", {
					data: tokenOptions,
				});
				console.log("token =", token);

				// Creating checkout //////////////////////////////////////////////////
				const checkoutOptions: CheckoutRequest = {
					checkout_reference: envVariables.sumupClientSecret,
					redirect_url: envVariables.sumupRedirectUri,
					merchant_code: envVariables.sumupId,
					merchant_name: "Aromasa Decor",
					currency: "BRL",
					amount: 1.0,
				};
				const checkout = await axiosInstance.post<
					CheckoutRequest | Res_400 | Res_401 | Res_403 | Res_409 | Res_201
				>("https://api.sumup.com/v0.1/checkouts", {
					headers: {
						Authorization: "Bearer " + token.data,
					},
					data: checkoutOptions,
				});
				console.log("checkout =", checkout);
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
		case "GET":
			try {
				const id = req.body.id;
				console.log("id =", id);

				const res = await axiosInstance.get(
					`https://api.sumup.com/v0.1/checkouts/${id}`
				);
				console.log("response from 'pages/api/payment/index.ts/GET' =", res);
			} catch (error) {}
			break;
		default:
			return res.status(405).end("Method Not Allowed");
			break;
	}
}

type TokenRequest = {
	grant_type: "authorization_code";
	client_id: string;
	client_secret: string;
	code: string;
	refresh_token?: string;
};

type TokenResponse_200 = {
	access_token: string;
	token_type: "Bearer";
	expires_in: number;
	refresh_token: string;
};

type TokenResponse_400 = {
	error_description: "Code parameter invalid or expired";
	error: "invalid_grant";
};

type GetAuthRequestFromUser = {
	response_type: "code";
	client_id: string;
	redirect_uri: string;
	scope: "payments";
	state?: string;
};

type Res_400 = {
	message: "Validation error: a required parameter is missing.";
	error_code: "MISSING";
	param: string;
};

type Res_401 = {
	error_message: "Invalid access token: the access token is invalid or has expired.";
	error_code: "NOT_AUTHORIZED";
};

type Res_403 = {
	error_message: "checkout_payments_not_allowed\nYou do not have the required permission for making this request.";
	error_code: "FORBIDDEN";
	status_code: 403;
};

type Res_409 = {
	error_code: "DUPLICATED_CHECKOUT";
	message: "A resource with the specified parameters already exists on the server. Checkout with this checkout reference and pay to email already exists";
};

type CheckoutRequest = {
	checkout_reference: string;
	amount: number;
	merchant_code: string;
	merchant_name: string;
	redirect_url: string;
	currency:
		| "BGN"
		| "BRL"
		| "CHF"
		| "CLP"
		| "CZK"
		| "DKK"
		| "EUR"
		| "GBP"
		| "HRK"
		| "HUF"
		| "NOK"
		| "PLN"
		| "RON"
		| "SEK"
		| "USD";
};

type Res_201 = {
	checkout_reference: string;
	amount: number;
	currency: string;
	pay_to_email: string;
	merchant_code: string;
	description: string;
	return_url: string;
	id: string;
	status: string;
	date: string;
	valid_until: string;
	customer_id: string;
	mandate: {
		type: string;
		status: string;
		merchant_code: string;
	};
	transactions: [
		{
			id: string;
			transaction_code: string;
			amount: number;
			currency: string;
			timestamp: string;
			status: string;
			payment_type: string;
			installments_count: number;
			merchant_code: string;
			vat_amount: number;
			tip_amount: number;
			entry_mode: string;
			auth_code: string;
			internal_id: number;
		}
	];
};
