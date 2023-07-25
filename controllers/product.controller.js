import productsModel from "../models/products.model";

export const getProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(q);

    let filtered = {};
    if (q !== undefined) {
      filtered = {
        $or: [
          { name: { $regex: searchRgx, $options: "i" } },
          { description: { $regex: searchRgx, $options: "i" } },
        ],
      };
    }

    const productData = await productsModel.find(filtered);
    if (productData) {
      return res.status(200).json({
        data: productData,
        msg: "Success!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const existingProduct = await productsModel.findOne({ name: name });
    if (existingProduct) {
      existingProduct.quantity += 1;
      await existingProduct.save();
      return res.status(200).json({
        data: existingProduct,
        msg: "Product Quantity Updated",
      });
    } else {
      const productData = new productsModel({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
      });
      productData.save();
      if (productData) {
        return res.status(201).json({
          data: productData,
          msg: "Success!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const { name, description, price, quantity } = req.body;
    const updatedData = await productsModel.updateOne(
      { _id: productID },
      {
        $set: {
          name: name,
          description: description,
          price: price,
          quantity: quantity,
        },
      }
    );
    if (updatedData.acknowledged) {
      return res.status(201).json({
        data: updatedData,
        msg: "Product Updated!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const removeData = await productsModel.deleteOne({ _id: productID });
    if (removeData.acknowledged) {
      return res.status(201).json({
        msg: "Product Deleted!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
