import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "cashier", "manager"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User",UserSchema)