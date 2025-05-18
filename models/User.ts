import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string; 
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

// Use existing model if it exists (prevents recompilation errors in dev mode)
const User = models.User || model<IUser>("User", UserSchema);

export default User;
