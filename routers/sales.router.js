import express from 'express'
import { addSales, deleteSale, getSales, updateSales } from '../controllers/sales.controllers'
const saleRouter = express.Router()

saleRouter.get('/get-sales',getSales)
saleRouter.post('/add-sales',addSales)
saleRouter.put('/update-sales/:sale_id',updateSales)
saleRouter.delete('/delete-sales/:sale_id',deleteSale)

export default saleRouter