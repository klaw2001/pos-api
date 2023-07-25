import mongoose from "mongoose";
import productsModel from "./products.model";
import customerModel from "./customer.model";
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
  saleDate: {
    type: Date,
    default: Date.now,
  },
  customerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed"],
    required: true,
    default: "pending",
  },
  discount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Sale", SalesSchema);
