import Payment from '../models/Payment.js'
import Booking from '../models/Booking.js';
import crypto from 'crypto';

export const createOrder = async(req,res) => {
    try {
        const booking = await Booking.findById(req.body.bookingId);
        if(!booking) return res.status(404).json({message:"Booking Not Found"});
        const order = {
            amount : booking.price * 100,
            currency : "INR",
            receipt : booking._id.toString()
        }
        const createdOrder = await razorpay.orders.create(order);
        await Payment.create({
            bookingId: booking._id,
            amount : booking.amount,
            razorpayOrderId : createdOrder.id
        });
        res.json(createdOrder);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const verifyPayment = async(req,res) => {
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        const body = razorpay_order_Id + "|" + razorpay_payment_id;
        const generated = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")
        if(generated!=razorpay_signature)
        {
            return res.status(400).json({ message: "Invalid signature" });
        }
        const payment = await Payment.findByIdAndUpdate(
            {razorpayOrderId:razorpay_order_Id},
            {status:"completed"},
            {new:true}
        )
        res.json({ message: "Payment has been done" });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}