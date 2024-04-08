import { Product } from "../models/productModel.js";
import express, { response } from "express";

const router = express.Router();

// Add product
router.post("/add", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.price ||
      !request.body.stock ||
      !request.body.category) {
      return response
        .status(400)
        .send({ message: "Please send all the product details!" });
    }

    const newProduct = Product({
      name: request.body.name,
      price: request.body.price,
      stock: request.body.stock,
      category: request.body.category,
    });

    const product = await Product.create(newProduct);
    return response.status(201).send(product);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// View product
router.get("/view/:id", async (request, response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    return response.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// View product
router.get("/viewbyname/:name", async (request, response) => {
  try {
    const { name } = request.params;
    const product = await Product.findOne({name: name});

    return response.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//filter by category
router.get("/filter/:category", async (request, response) => {
  try {
    const {category} = request.params;
    const products = await Product.find({category: category}).sort({name: 1});

    return response.status(200).send(products);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
})

//get unique categories
router.get("/categories", async (request, response) => {
  try {
    const categories = await Product.distinct("category");

    return response.status(200).send(categories);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
})

// View all products
router.get("/viewall", async (request, response) => {
  try {
    const products = await Product.find({}).sort({name: 1});

    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/edit/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.price ||
      !request.body.stock ||
      !request.body.category
    ) {
      return response
        .status(400)
        .send({ message: "Please send all the product details!" });
    }

    const { id } = request.params;

    const result = Product.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(400).json({ message: "Id not found!" });
    }

    return response.status(200).send({ message: "Stock updated successfully!" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// edit stock amount
router.put("/edit_stock", async (request, response) => {
  try {
    console.log(request.body);
    if (
      !request.body.name ||
      !request.body.stock
    ) {
      return response
        .status(400)
        .send({ message: "Please send product name and stock amount!" });
    }

    console.log("here2")
    const result = await Product.updateOne({name: request.body.name}, {$set: {stock: request.body.stock}});

    if (result.nModified == 0) {
      return response.status(400).json({ message: "Id not found!" });
    }

    return response.status(200).send({ message: "Stock updated successfully!" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.put("/deductStock", async (request, response) => {
  try {
      const product = await Product.findOne({name: request.body.name});
      if (!product) {
          return response.status(404).send("Product not found");
      }

      product.stock -= request.body.quantity;
      await product.save();
      
      response.status(200).send("Stock deducted successfully");
  } catch (error) {
      console.error(error.message);
      response.status(500).send("Internal Server Error");
  }
});


// Delete a product
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = Product.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Product not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
