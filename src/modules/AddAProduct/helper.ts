import Nope from "nope-validator";

import { ProductToAddToTheServer } from ".";

const nopeSchema = Nope.object().shape({
	title: Nope.string()
		.required("Um título para o produto é necessário!")
		.max(250, "O título não pode ter mais de 250 caracteres!"),
	price: Nope.string()
		.test(value =>
			Number(value) >= 0.0
				? undefined
				: "Peso deve ser um número positivo ou zero."
		)
		.required("Um preço para o produto é necessário!"),
	ingredients: Nope.string().max(
		3000,
		"A descrição de ingredientes não pode ter mais de 3.000 caracteres!"
	),
	usage_tips: Nope.string().max(
		3000,
		"A descrição não pode ter mais de 3.000 caracteres!"
	),
	categories: Nope.string().required("Uma categoria do produto é necessária!"),
	description: Nope.string()
		.max(3000, "A descrição não pode ter mais de 3.000 caracteres!")
		.required("Uma descrição do produto é necessária!"),
	bottle: Nope.object().shape({
		available_quantity: Nope.string()
			.test(value => {
				const n = Number(value);
				console.log("n is =", n);
				return Number.isInteger(n) && n >= 0
					? undefined
					: "Quantidade disponível deve ser um número inteiro positivo ou zero.";
			})
			.required("A quantidade disponível deste produto é necessária!"),
		bottle_format: Nope.string().max(
			100,
			"O volume não pode ter mais 50 caracteres!"
		),
		volume: Nope.string().test(value =>
			Number(value) >= 0.0
				? undefined
				: "Volume deve ser um número positivo ou zero."
		),
		weight: Nope.string().test(value =>
			Number(value) >= 0.0
				? undefined
				: "Peso deve ser um número positivo ou zero."
		),
	}),
});

const myFormId = "add-product-form";

const defaultProduct: ProductToAddToTheServer = {
	bottle: {
		available_quantity: "",
		bottle_format: "",
		volume: "",
		weight: "",
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

function buildFormData(formData: FormData, data: any, parentKey: string) {
	if (
		data &&
		typeof data === "object" &&
		!(data instanceof Date) &&
		!(data instanceof File) &&
		!(data instanceof Blob)
	) {
		Object.keys(data).forEach(key => {
			buildFormData(
				formData,
				data[key],
				parentKey ? `${parentKey}.${key}` : key
			);
		});
	} else {
		const value = !data ? "" : data;

		formData.append(parentKey, value);
	}
}

export { myFormId, nopeSchema, defaultProduct, buildFormData };
