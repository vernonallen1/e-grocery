import { CartProduct } from "../models/cartProductModel.js";
import { Product } from "../models/productModel.js";
import express, { response } from "express";

const router = express.Router();

router.get('/get', async (request, response) => {
    try {
        const products = await CartProduct.find({})

        return response.status(200).json({
            count: products.length,
            data: products
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

router.get('/getcartproduct/:name', async (request, response) => {
    const {name} = request.params;
    try {
        const products = await CartProduct.findOne({name: name})
        return response.status(200).json({
            data: products
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

router.post('/add', async (request, response) => {
    try {
        if (!request.body.name || !request.body.quantity) {
            console.log(request.body)
            return response.status(404).send({message: 'Please send all the required data!'})
        }
        
        const product = await Product.findOne({name: request.body.name});
        
        const newCartProduct = CartProduct({
            name: request.body.name,
            quantity: request.body.quantity,
            cost: request.body.quantity * product.price
        });

        const cartProduct = await CartProduct.create(newCartProduct);
        return response.status(201).send(cartProduct);
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

router.put('/update_quantity', async (request, response) => {
    try {

        if (!request.body.name || !request.body.quantity) {
            return response.status(404).send({message: 'Please send all the required data!'})
        }

        
        const cartProduct = await CartProduct.findOne({name: request.body.name});

        const product = await Product.findOne({name: request.body.name})
        
        const updatedCartProduct = {
            name: request.body.name,
            quantity: Number(cartProduct.quantity) + Number(request.body.quantity),
            cost: cartProduct.cost + (product.price*request.body.quantity)
        }

        const result = await CartProduct.findByIdAndUpdate(cartProduct._id, updatedCartProduct)
        if (!result) {
            return response.status(400).json({ message: "Cart Product not found!" });
        }
      
        return response.status(200).send({ message: "Cart Product updated successfully!" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

router.put('/updatecart', async (request, response) => {
    try {

        if (!request.body.name || !request.body.quantity || !request.body.cost) {
            return response.status(404).send({message: 'Please send all the required data!'})
        }
        const cartProduct = await CartProduct.findOne({name: request.body.name});
        
        const updatedCartProduct = {
            name: request.body.name,
            quantity: request.body.quantity,
            cost: request.body.cost
        }

        const result = await CartProduct.findByIdAndUpdate(cartProduct._id, updatedCartProduct)
        if (!result) {
            return response.status(400).json({ message: "Cart Product not found!" });
        }
      
        return response.status(200).send({ message: "Cart Product updated successfully!" });
    } catch (error) {
        console.log('here')
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

router.delete("/delete/:name", async (request, response) => {
    try {
      const { name } = request.params;

      const result = await CartProduct.findOneAndDelete({name: name});
  
      if (!result) {
        return response.status(404).json({ message: "Product not found" });
      }
  
      return response.status(200).send({ message: "Product deleted successfully!" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.delete("/deleteAll", async (request, response) => {
    try {
        console.log("here");
      const result = await CartProduct.deleteMany({});

      console.log(result.deletedCount)
  
      if (result.deletedCount === 0) {
        return response.status(404).json({ message: "Delete was unsuccessful" });
      }
  
      return response.status(200).send({ message: "All products are deleted successfully!" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;