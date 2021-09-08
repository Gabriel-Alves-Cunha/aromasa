import { NextApiRequest, NextApiResponse } from "node_modules/next";
import formidable from "formidable";
import Stripe from "stripe";
import fs from "fs";

import { envVariables } from "storage/env";
import { ProductModel } from "models/Product";
import connectToMongoDB from "utils/connectToMongoDB";

const stripe = new Stripe(envVariables.stripeSecretKey, {
	apiVersion: "2020-08-27",
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function talkToDb(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectToMongoDB();

	res.on("end", something => {
		console.log("\nApi response ended:\n", something);
		return;
	});
	res.on("error", err => {
		console.log("\nApi response error:\n", err);
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
		case "GET" || undefined:
			try {
				return res.status(200).json({
					success: true,
					data: await ProductModel.find({}),
				});
			} catch (err) {
				console.log(
					`[ERROR]\n\tFile: 'api/products/index.ts' in GET on talkToDB()\n\tLine:53\n\t${typeof err}: 'err' = ${err}`
				);

				return res.status(400).json({ success: false, data: err });
			}
			break;
		///////////////////////////////////////////////
		// Create a product
		case "POST":
			try {
				const form = formidable({
					uploadDir: "public/images/uploads/products_images",
					maxFileSize: 20 * 1024 * 1024,
					allowEmptyFiles: false,
					keepExtensions: true,
					multiples: true,
				});

				form.once("error", err => {
					console.error(err);
					res.status(err.statusCode ?? 400).json(err);
				});
				form.once("end", () => {
					console.log("-> Upload to server done.");
				});

				form.parse(req, async (err, fields, files) => {
					console.log("\ninside form.parse()\n");
					// console.log("\nfields =", fields);
					// console.log("\nfiles =", files);
					// console.log(filesPaths);
					const filesPaths: string[] = Object.entries(files).map(
						([_key, value]) => (value as formidable.File).path
					);

					const newProduct = { ...fields, imagesPaths: filesPaths };

					try {
						// const ret = "just testing";
						const productCreatedOnDB = await ProductModel.create([newProduct], {
							writeConcern: { j: true },
							validateBeforeSave: true,
							timestamps: true,
							checkKeys: true,
						});

						const productCreatedOnStripe = await stripe.products.create({
							active: productCreatedOnDB[0].isAvailableToSell,
							description: productCreatedOnDB[0].description,
							name: productCreatedOnDB[0].title,
							id: productCreatedOnDB[0].id,
						});

						console.log(
							"\nret from ProductModel.create() =",
							productCreatedOnDB
						);
						console.log(
							"\nret from productCreatedOnStripe.create() =",
							productCreatedOnStripe
						);

						return res.status(201).json({
							success: true,
							data: { productCreatedOnDB, productCreatedOnStripe },
						});
					} catch (error) {
						console.log(`\nError creating ProductModel = ${error}`);

						filesPaths.forEach(filePath =>
							fs.unlink(filePath, err => {
								if (err && err.code == "ENOENT")
									console.log(`\nError! File '${filePath}' doesn't exist.\n`);
								else if (err)
									console.error(
										`\nSomething went wrong. Please try again later: ${err}\n`
									);
								else
									console.log(
										`\nSuccessfully removed file with the path of ${filePath}\n`
									);
							})
						);

						return res.status(400).json({ success: false, data: err + error });
					}
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
