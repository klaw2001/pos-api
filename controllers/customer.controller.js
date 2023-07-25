import customerModel from "../models/customer.model";

export const getCustomers = async (req, res) => {
  try {
    const customerData = await customerModel.find(); 
    if (customerData) {
      return res.status(200).json({
        data: customerData,
        msg: "Success!",
      });
    }
    console.log(customerData)
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const existingCustomer = await customerModel.findOne({ email: email });
    if (existingCustomer) {
      return res.status(400).json({
        msg: "Customer Already Exists",
      });
    }
    const customerData = new customerModel({
      name: name,
      email: email,
      phone: phone,
    });
    customerData.save();
    if (customerData) {
      return res.status(201).json({
        data: customerData,
        msg: "Customer Added!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customerID = req.params.customer_id;
    const { name, email, phone, purchasedHistory, loyaltyPoints } = req.body;

    const updatedData = await customerModel.updateOne(
      {
        _id: customerID,
      },
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          purchasedHistory: purchasedHistory,
          loyaltyPoints: loyaltyPoints,
        },
      }
    );
    if (updatedData.acknowledged) {
      return res.status(200).json({
        data: updatedData,
        msg: "Customer Details Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customerID = req.params.customer_id;
    const removeCustomer = await customerModel.deleteOne({ _id: customerID });
    if (removeCustomer.acknowledged) {
      return res.status(200).json({
        msg: "Customer Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
