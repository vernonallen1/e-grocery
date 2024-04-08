import mongoose from 'mongoose';

export const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true 
        },
        category: {
            type: String,
            required: true
        }
    }
)

export const Product = mongoose.model('Product', productSchema);