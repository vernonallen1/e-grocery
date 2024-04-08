import mongoose from 'mongoose';
import { cartProductSchema } from './cartProductModel.js';

const transactionSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    products: [cartProductSchema],
    total: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
})

export const Transaction = mongoose.model('Transaction', transactionSchema);
