import * as yup from "yup";

import { ProductToAddToTheServer } from ".";

const yupSchema = yup.object().shape({
	title: yup
		.string()
		.trim()
		.required("Um título para o produto é necessário!")
		.max(200, "O título não pode ter mais de 200 caracteres!"),
	price: yup
		.number()
		.positive("O preço deve um número positivo!")
		.required("Um preço para o produto é necessário!"),
	ingredients: yup
		.string()
		.trim()
		.max(
			3000,
			"A descrição de ingredientes não pode ter mais de 3.000 caracteres!"
		),
	categories: yup
		.array()
		.of(yup.string().trim())
		.min(1)
		.required("Uma categoria do produto é necessária!"),
	description: yup
		.string()
		.trim()
		.max(3000, "A descrição não pode ter mais de 3.000 caracteres!")
		.required("Uma descrição do produto é necessária!"),
	available_bottles: yup.array(
		yup.object().shape({
			available_quantity: yup
				.number()
				.integer()
				.positive("A quantidade disponível deve um número positivo!")
				.min(0)
				.required("A quantidade disponível deste produto é necessária!"),
			bottle_format: yup
				.string()
				.trim()
				.max(50, "O volume não pode ter mais 50 caracteres!"),
			volume: yup
				.number()
				.positive("O volume deve um número positivo!")
				.min(0.0),
			weight: yup.number().positive("O peso deve um número positivo!").min(0.0),
		})
	),
});

const myFormId = "add-product-form";

const defaultProduct: ProductToAddToTheServer = {
	bottle: {
		available_quantity: "",
		bottle_format: "",
		volume: undefined,
		weight: undefined,
	},
	packageDimensions: {
		height: "",
		length: "",
		weight: "",
		width: "",
	},
	isAvailableToSell: false,
	description: "",
	imagesPaths: [],
	ingredients: "",
	categories: [],
	usage_tips: "",
	price: "",
	title: "",
};

export { myFormId, yupSchema, defaultProduct };
