import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = 'usd'
const deliveryCharge = 10

const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

const verifyStripe = async (req, res) => {
    const userId = req.userId;
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true })
        } else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false})
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId })
        res.json({ success: true, orders })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await orderModel.findByIdAndUpdate(req.params.id, { status })
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" })
        }
        res.json({ success: true, message: "Status Updated" })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe }