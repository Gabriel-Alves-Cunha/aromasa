import mongoose, { Schema, model } from "mongoose";

type MongoDBImage = File;

const imageSchema = new Schema<MongoDBImage>({
	lastModified: Number,
	name: String,
	size: Number,
	type: String,
	data: Buffer,
});

console.log("\nCompilando imageSchema...\n");

export const ImageModel: mongoose.Model<MongoDBImage, {}, {}> =
	mongoose.models.Image || model<MongoDBImage>("Image", imageSchema);
