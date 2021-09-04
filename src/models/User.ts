import mongoose, { Schema, model } from "mongoose";

type MongoDBUser = {
	admin?: boolean;
	email?: string;
	image?: string;
	name?: string;
	createdAt: string;
	updatedAt: string;
};

const userSchema = new Schema<MongoDBUser>({
	admin: Boolean,
	image: String,
	email: String,
	name: String,
	createdAt: String,
	updatedAt: String,
});

console.log("\nCompilando userSchema...\n");

export const UserModel: mongoose.Model<MongoDBUser, {}, {}> =
	mongoose.models.users || model<MongoDBUser>("users", userSchema);
