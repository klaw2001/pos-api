import salesModel from "../models/sales.model";

export const getSales = async (req, res) => {
  try {
    const salesData = await salesModel.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerID",
          foreignField: "_id",
          as: "customers",
        },
      },
      {
        $unwind: "$customers",
      },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
    ]);
    if (salesData) {
      return res.status(200).json({
        data: salesData,
        msg: "Success!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addSales = (req, res) => {
  try {
    const { customerID, productID, totalAmount, paymentMethod, paymentStatus } =
      req.body;

    const salesData = new salesModel({
      customerID,
      productID,
      totalAmount,
      paymentMethod,
      paymentStatus,
    });
    salesData.save();
    if (salesData) {
      return res.status(201).json({
        data: salesData,
        msg: "Success!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateSales = async (req, res) => {
  try {
    const saleID = req.params.sale_id;
    const { customerID, productID, totalAmount, paymentMethod, paymentStatus } =
      req.body;

    const updatedData = await salesModel.updateOne(
      { _id: saleID },
      {
        $set: {
          customerID,
          productID,
          totalAmount,
          paymentMethod,
          paymentStatus,
        },
      }
    );
    if(updatedData.acknowledged){
      return res.status(200).json({
        data: updatedData,
        msg: "Sales Details Updated!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const saleID = req.params.sale_id;
    const removeData = await salesModel.deleteOne({_id:saleID})
    if(removeData.acknowledged){
      return res.status(200).json({
        msg: "Sales Details Deleted!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
