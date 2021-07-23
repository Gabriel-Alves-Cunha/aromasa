import mongoose, { Schema, Document } from "mongoose";

export type Product = Document & {
	availableAmount: number;
	isAvailable: boolean;
	description: string;
	category: string;
	images: string[];
	title: string;
	price: string;
	_id: string;
};

export type ClientChosenProduct = Product & {
	amount: number;
};

export const product_collection_name = "Product";

// By default, Mongoose adds an _id property to your schemas.
const productSchema = new Schema<Product>({
	description: {
		type: String,
		required: [true, "Uma descrição do produto é necessária!"],
		unique: true,
		trim: true,
		maxlength: [2000, "A descrição não pode ter mais de 2.000 caracteres!"],
	},
	category: {
		type: String,
		required: [true, "Uma categoria do produto é necessária!"],
		unique: false,
		trim: true,
		maxlength: [200, "A descrição não pode ter mais de 200 caracteres!"],
	},
	images: {
		type: Array,
		required: [true, "Imagens do produto são necessárias!"],
	},
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
		unique: false,
		trim: true,
		maxlength: [20, "O preço não pode ter mais de 20 caracteres!"],
	},
	availableAmount: {
		type: Number,
		required: [true, "A quantidade disponível deste produto é necessária!"],
	},
	isAvailable: {
		type: Boolean,
		required: true,
	},
});

console.log("\nCompilando productSchema...\n");

let toBeExported;

try {
	toBeExported = mongoose.model(product_collection_name);
} catch (error) {
	// console.error("\n[ERROR - RECOVERABLE]:\n", error);

	toBeExported = mongoose.model(product_collection_name, productSchema);
}

export default toBeExported;
