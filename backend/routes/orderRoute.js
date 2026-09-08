import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRoute = express.Router()

orderRoute.get("/", adminAuth, allOrders)
orderRoute.put("/:id/status", adminAuth, updateStatus)

orderRoute.get("/user", authUser, userOrders)

orderRoute.post("/", authUser, placeOrder)
orderRoute.post("/stripe", authUser, placeOrderStripe)
orderRoute.post("/stripe/verify", authUser, verifyStripe)

export default orderRoute