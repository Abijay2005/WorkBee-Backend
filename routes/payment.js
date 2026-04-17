import {createOrder,verifyPayment} from "../controller/paymentController.js"
import express from 'express';

const router = express.Router();
router.post('/create',createOrder);
router.post('/verify',verifyPayment);

export default router;