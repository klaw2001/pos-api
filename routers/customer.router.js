import express from "express";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.get("/get-customers", getCustomers);
customerRouter.post("/add-customer", addCustomer);
customerRouter.put("/update-customer/:customer_id", updateCustomer);
customerRouter.delete("/delete-customer/:customer_id", deleteCustomer);

export default customerRouter;
