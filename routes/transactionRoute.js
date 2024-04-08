import { Transaction } from "../models/transactionModel.js";
import express, { response } from "express";

const router = express.Router();

router.post("/add", async (request, response) => {
    try {
        console.log(request.body);
        if (!request.body.customer ||
            !request.body.cartProducts ||
            !request.body.total) {
            return response.status(400).send("Please send all the data!");
        }

        const newTransaction = Transaction({
            customer: request.body.customer,
            isPaid: request.body.isToggled,
            products: request.body.cartProducts,
            total: request.body.total
        });

        const createdTransaction = await Transaction.create(newTransaction);
        return response.status(200).json(createdTransaction);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get("/get", async (request, response) => {
    try {
        const transactions = await Transaction.find({});
        return response.status(200).json(transactions);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


export default router;