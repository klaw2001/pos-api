import express from 'express'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller'
import auth from '../middleware/auth.middleware'

const productRouter = express.Router()

productRouter.get('/get-products',auth ,getProducts)
productRouter.post('/add-product',auth, addProduct)
productRouter.put('/update-product/:product_id',auth, updateProduct)
productRouter.delete('/delete-product/:product_id',auth, deleteProduct)

export default productRouter