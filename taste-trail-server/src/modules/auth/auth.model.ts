import { Schema, model } from "mongoose";
import { IUser } from "./auth.type";

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    profilePhoto: {
      type: String,
      required: [true, "Profile photo is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
