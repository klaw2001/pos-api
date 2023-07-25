import express from 'express'
import { addUser, deleteUser, getUsers, signIn, updateUser } from '../controllers/user.controller'
import auth from '../middleware/auth.middleware'


const userRouter = express.Router()

userRouter.get('/get-users',auth,getUsers )
userRouter.post('/add-user',addUser)
userRouter.put('/update-user/:user_id',updateUser)
userRouter.delete('/delete-user/:user_id',deleteUser)
userRouter.post('/sign-in',signIn)
export default userRouter