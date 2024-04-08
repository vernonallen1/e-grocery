import mongoose, { trusted } from 'mongoose';

export const cartProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true 
    },
    cost: {
        type: Number,
        required: true
    }
})

export const CartProduct = mongoose.model('CartProduct', cartProductSchema);