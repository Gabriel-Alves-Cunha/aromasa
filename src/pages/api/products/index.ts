import { NextApiRequest, NextApiResponse } from "node_modules/next";
import cloudinary from "cloudinary";
import formidable from "formidable";

import { ProductToAddToTheServer } from "modules/AddAProduct";
import { envVariables } from "utils/env";
import { ProductModel } from "models/Product";
import { Compute } from "utils/types";
import connectToMongoDB from "utils/connectToMongoDB";

const isTesting = false;

cloudinary.v2.config({
	cname: envVariables.cloudinaryURL,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function talkToDbToGetProducts(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectToMongoDB();

	res.on("end", something => {
		console.log("\nApi response ended:\n", something);
		return;
	});
	res.on("error", err => {
		console.error("\nApi response error:\n", err);
		return;
	});
	res.on("finish", () => {
		console.log("\nApi response finished.\n");
		return;
	});
	res.on("close", () => {
		console.log("\nApi response closed.\n");
		return;
	});

	switch (req.method) {
		// Get all products
		case "GET":
			try {
				return res.status(200).json({
					success: true,
					data: await ProductModel.find({}),
				});
			} catch (err) {
				console.log(
					`[ERROR]\n\tFile: 'api/products/index.ts' in GET on talkToDB()\n\tLine:61\n\t${typeof err}: 'err' = ${err}`
				);

				return res.status(400).json({ success: false, data: err });
			}
			break;
		///////////////////////////////////////////////
		// Create a product
		case "POST":
			try {
				const newProduct: Compute<
					Partial<ProductToAddToTheServer> & {
						files?: formidable.Files;
					}
				> = await new Promise((resolve, reject) => {
					const form = new formidable.IncomingForm();

					form.once("error", err => reject(err));

					form.parse(req, (err, fields, files) =>
						resolve({ ...fields, files })
					);
				});
				const imgsUrls: string[] = [];

				console.log("newProduct =", newProduct);

				if (newProduct.files) {
					const files = Object.entries(newProduct.files).map(
						([key, file]) => file as formidable.File
					);

					const promisesFromCloudinary = files.map(
						async file =>
							await cloudinary.v2.uploader.upload(
								file.path,
								undefined,
								(error, result) => console.log(error, result)
							)
					);

					const cloudinaryUploadApiResponses = await Promise.all(
						promisesFromCloudinary
					);

					console.log(
						"responsesFromCloudinary =",
						cloudinaryUploadApiResponses
					);

					cloudinaryUploadApiResponses.forEach(res =>
						imgsUrls.push(res.secure_url)
					);

					delete newProduct["files"];

					newProduct.imagesPaths = imgsUrls;
				}

				if (process.env.NODE_ENV === "production" || isTesting) {
					try {
						const productCreatedOnDB = await ProductModel.create([newProduct], {
							writeConcern: { j: true },
							validateBeforeSave: true,
							timestamps: true,
							checkKeys: true,
						});
						console.log(
							"\nret from ProductModel.create() =",
							productCreatedOnDB
						);

						if (productCreatedOnDB[0]) {
							return res.status(201).json({
								success: true,
								data: { productCreatedOnDB },
							});
						} else
							return res.status(400).json({
								success: false,
								data: "Product was not created on DB!",
							});
					} catch (error) {
						console.error(`\nError creating ProductModel = ${error}`);

						return res.status(400).json({ success: false, data: error });
					}
				} else
					return res.status(201).json({
						success: true,
						data: newProduct,
					});
			} catch (error: any) {
				console.log(
					`\n[ERROR on talkToDB() on 'api/products/index.ts' in POST]:\n${error}`
				);

				return res
					.status(error.statusCode ?? 500)
					.json({ success: false, data: error });
			}
			break;
		///////////////////////////////////////////////
		default:
			return res.status(400).json({
				success: false,
				data: "Entered default case on 'pages/api/products/index.ts'!",
			});
			break;
	}
}
