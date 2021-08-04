import mongoose, { Schema, Types, model } from "mongoose";

import { ImageModel } from "./Image";

export type Product = {
	available_bottles: {
		available_quantity: string;
		bottle_format?: string;
		volume?: string;
		weight?: string;
	}[];
	images: File[];
	isAvailable: boolean;
	description: string;
	_id: Types.ObjectId;
	usage_tips?: string;
	category: string[];
	title: string;
	price: string;
};

export type ClientChosenProduct = {
	chosen_bottle: {
		available_quantity: string;
		bottle_format?: string;
		volume?: string;
		weight?: string;
	}[];
	amountThatWillBeBought: string;
	images: File[];
	availableAmount: string;
	isAvailable: boolean;
	description: string;
	_id: Types.ObjectId;
	usage_tips?: string;
	category: string[];
	title: string;
	price: string;
};

// By default, Mongoose adds an _id property to your schemas.
const productSchema = new Schema<Product>({
	description: {
		type: String,
		required: [true, "Uma descrição do produto é necessária!"],
		unique: true,
		trim: true,
		maxlength: [2000, "A descrição não pode ter mais de 2.000 caracteres!"],
	},
	dicas_de_uso: {
		type: String,
		required: false,
		unique: false,
		trim: true,
		maxLength: [
			1000,
			"As dicas de uso não podem ter mais de 1.000 caracteres!",
		],
	},
	category: {
		type: Array,
		required: [true, "Uma categoria do produto é necessária!"],
	},
	imagesPaths: [
		{
			// type: ImageModel.schema,
			type: String,
			maxLength: 300,
		},
	],
	title: {
		type: String,
		required: [true, "Um título para o produto é necessário!"],
		unique: true,
		trim: true,
		maxlength: [200, "O título não pode ter mais de 200 caracteres!"],
	},
	price: {
		type: String,
		required: [true, "Um preço para o produto é necessário!"],
	},
	available_bottles: [
		{
			volume: {
				type: String,
				trim: true,
				maxLength: [14, "O volume não pode ter mais 14 caracteres!"],
				required: false,
			},
			bottle_format: {
				type: String,
				trim: true,
				maxLength: [50, "O volume não pode ter mais 50 caracteres!"],
				required: false,
			},
			available_quantity: {
				type: String,
				required: [true, "A quantidade disponível deste produto é necessária!"],
			},
			weight: {
				type: String,
				required: false,
			},
		},
	],
	isAvailable: {
		type: Boolean,
		required: true,
	},
});

console.log("\nCompilando productSchema...\n");

export const ProductModel: mongoose.Model<Product, {}, {}> =
	mongoose.models.Product || model<Product>("Product", productSchema);
