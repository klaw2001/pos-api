import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import customerRouter from "./routers/customer.router";
import saleRouter from "./routers/sales.router";
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
mongoose
  .connect("mongodb://127.0.0.1:27017/" + process.env.DB_NAME)
  .then(() => console.log("Connected!"));

app.listen(PORT, () => {
  console.log("Your server running on http://localhost:" + PORT);
});


app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/customers',customerRouter)
app.use('/sales',saleRouter)