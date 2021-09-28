import mongoose, { Schema, Types, model } from "mongoose";

export type Product = {
	bottle: {
		available_quantity: string;
		bottle_format?: string;
		volume?: string;
		weight?: string;
	};
	packageDimensions: {
		height: string;
		length: string;
		weight: string;
		width: string;
	};
	isAvailableToSell: boolean;
	imagesPaths: string[];
	categories: string[];
	ingredients?: string;
	description: string;
	_id: Types.ObjectId;
	usage_tips?: string;
	title: string;
	price: string;
};

export type ClientChosenProduct = {
	bottle: {
		amountThatWillBeBought: string;
		bottle_format?: string;
		volume?: string;
		weight?: string;
	};
	categories: string[];
	ingredients?: string;
	description: string;
	_id: Types.ObjectId;
	imagePath: string;
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
		maxlength: [3000, "A descrição não pode ter mais de 3.000 caracteres!"],
	},
	usage_tips: {
		type: String,
		required: false,
		unique: false,
		trim: true,
		maxLength: [
			1000,
			"As dicas de uso não podem ter mais de 1.000 caracteres!",
		],
	},
	ingredients: {
		type: String,
		maxLength: [
			3000,
			"As dicas de uso não podem ter mais de 3.000 caracteres!",
		],
		required: false,
	},
	categories: [
		{
			type: String,
			required: [true, "Uma categoria do produto é necessária!"],
		},
	],
	imagesPaths: [
		{
			type: String,
			maxLength: 1_000,
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
	bottle: {
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
	isAvailableToSell: {
		type: Boolean,
		required: [
			true,
			"Marque verdadeiro se o produto está disponível para venda!",
		],
	},
});

console.log("\nCompilando|recuperando productSchema...\n");

export const ProductModel: mongoose.Model<Product, {}, {}> =
	mongoose.models.Product || model<Product>("Product", productSchema);
