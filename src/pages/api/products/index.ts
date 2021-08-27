import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

import { ProductModel } from "models/Product";
import connectToDatabase from "utils/connectToMongoDB";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function talkToDb(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectToDatabase();

	const { method } = req;

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

	switch (method) {
		// Get all products
		case "GET" || undefined:
			try {
				const products = await ProductModel.find({});

				return res.status(200).json({ success: true, data: products });
			} catch (err) {
				console.log(
					`[ERROR]\n\tFile: 'api/products/index.ts' in GET on talkToDB()\n\tLine:51\n\t${typeof err}: 'err' =`,
					err
				);

				return res.status(400).json({ success: false, data: err });
			}
			break;
		///////////////////////////////////////////////
		// Create a product
		case "POST":
			try {
				console.log("\ninside POST\n");

				const form = formidable({
					uploadDir: "public/uploads/products_images",
					maxFileSize: 20 * 1024 * 1024,
					allowEmptyFiles: false,
					keepExtensions: true,
					multiples: true,
				});

				form.once("error", err => {
					console.error(err);
					res.status(400).json(err);
				});
				form.once("end", () => {
					console.log("-> Upload to server done.");
				});

				form.parse(req, async (err, fields, files) => {
					console.log("\ninside form.parse()\n");
					// console.log("\nfields =", fields);
					// console.log("\nfiles =", files);
					let filesPaths: string[] = [];
					Object.entries(files).forEach(pair =>
						//@ts-ignore
						filesPaths.push(pair[1].path)
					);
					// console.log(filesPaths);
					const newProduct = { ...fields, imagesPaths: filesPaths };

					try {
						// const ret = "just testing";
						const ret = await ProductModel.create([newProduct], {
							writeConcern: { j: true },
							validateBeforeSave: true,
							timestamps: true,
							checkKeys: true,
						});
						console.log("\nret from ProductModel.create() =", ret);

						return res.status(201).json({ success: true, data: ret });
					} catch (error) {
						console.log(`\nError creating ProductModel = ${error}`);

						filesPaths.forEach(filePath =>
							fs.unlink(filePath, err => {
								if (err && err.code == "ENOENT")
									console.log("Error! File doesn't exist.");
								else if (err)
									console.error(
										"\nSomething went wrong. Please try again later.",
										err
									);
								else
									console.log(
										`\n\nSuccessfully removed file with the path of ${filePath}\n`
									);
							})
						);

						return res.status(400).json({ success: false, data: err });
					}
				});
			} catch (error) {
				console.log(
					"\n\n[ERROR on talkToDB() on 'api/products/index.ts' in POST]:\n\n",
					error
				);

				return res.json({ success: false, data: error });
			}
			break;
		///////////////////////////////////////////////
		default:
			return res
				.status(400)
				.json({ success: false, data: "Entered default case!" });
			break;
	}
}
