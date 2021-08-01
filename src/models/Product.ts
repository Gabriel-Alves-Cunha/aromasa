import mongoose, { Schema, Types, model } from "mongoose";
import { FileToSend } from "../modules/AddAProduct";

export type Product = {
	available_bottles: {
		available_quantity: number;
		bottle_format: string;
		volume: number;
		weight: number;
	};
	images: FileToSend[];
	isAvailable: boolean;
	description: string;
	_id: Types.ObjectId;
	usage_tips: string;
	category: string;
	title: string;
	price: number;
};

export type ClientChosenProduct = {
	chosen_bottle: {
		available_quantity: number;
		bottle_format: string;
		volume: number;
		weight: number;
	};
	amountThatWillBeBought: number;
	images: FileToSend[];
	availableAmount: number;
	isAvailable: boolean;
	description: string;
	_id: Types.ObjectId;
	usage_tips: string;
	category: string;
	title: string;
	price: number;
};

export const product_collection_name = "Product";

// By default, Mongoose adds an _id property to your schemas.
const schema = new Schema<Product>({
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
	images: [
		{
			name: {
				type: String,
				required: [true, "Um nome para a imagem é necessário!"],
			},
			arrayBuffer: {
				type: Array,
				required: [true, "Um arrayBuffer (os bytes da imagem) é necessário!"],
			},
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
		type: Number,
		required: [true, "Um preço para o produto é necessário!"],
	},
	available_bottles: [
		{
			volume: {
				type: Number,
				trim: true,
				maxLength: [14, "O volume não pode ter mais 14 caracteres!"],
			},
			bottle_format: {
				type: String,
				trim: true,
				maxLength: [50, "O volume não pode ter mais 50 caracteres!"],
			},
			available_quantity: {
				type: Number,
				required: [true, "A quantidade disponível deste produto é necessária!"],
			},
			weight: {
				type: Number,
				required: [true, "O peso deste produto é necessária!"],
			},
		},
	],
	isAvailable: {
		type: Boolean,
		required: true,
	},
});

console.log("\nCompilando productSchema...\n");

// let toBeExported;

// try {
// 	toBeExported = mongoose.model(product_collection_name);
// } catch (error) {
// 	// console.error("\n[ERROR - RECOVERABLE]:\n", error);

// 	toBeExported = mongoose.model(product_collection_name, productSchema);
// }

// export default toBeExported;

export const ProductModel: mongoose.Model<Product, {}, {}> =
	mongoose.models.Product || model<Product>("Product", schema);
