import mongoose, { Schema } from "mongoose";

export type Product = {
	images: StaticImageData[] | string[];
	description: string;
	category: string;
	title: string;
	price: string | number;
	id: string | number;
};

export type ClientSideProduct = {
	images: StaticImageData[] | string[];
	description: string;
	category: string;
	title: string;
	price: string | number;
	id: string | number;
	amount: number | undefined;
};

const ProductSchema = new Schema({
	description: Schema.Types.String,
	category: Schema.Types.String,
	images: Schema.Types.Array,
	title: Schema.Types.String,
	price: Schema.Types.String,
	id: Schema.Types.ObjectId,
});

export default mongoose.model("Product", ProductSchema);
