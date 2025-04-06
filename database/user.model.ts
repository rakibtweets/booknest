import { Schema, type Document, model, models } from "mongoose";
import baseSchema from "./base-schema";

// User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  image: { type: String },
});
UserSchema.add(baseSchema);

// Create and export the model
const User = models?.User || model<IUser>("User", UserSchema);

export default User;
