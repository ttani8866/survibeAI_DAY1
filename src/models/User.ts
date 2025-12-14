import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "名前は必須です"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "メールアドレスは必須です"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

