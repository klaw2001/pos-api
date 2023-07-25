import mongoose from "mongoose";
import salesModel from "./sales.model";
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  purchasedHistory: {
    type: Schema.Types.ObjectId,
    required:true,
  },
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
});


export default mongoose.model('Customer',CustomerSchema)
