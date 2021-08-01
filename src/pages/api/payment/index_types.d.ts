import { MercadoPago } from "mercadopago/interface";

type Items = NonNullable<
	Parameters<MercadoPago["preferences"]["create"]>[0]["items"]
>;

type Shipment = NonNullable<
	Parameters<MercadoPago["preferences"]["create"]>[0]["shipments"]
>;

export type { MercadoPago, Shipment, Items };
