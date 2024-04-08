import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from "./config.js";
import productsRouter from './routes/productsRoute.js';
import cartProductRouter from './routes/cartRoute.js';
import transactionRouter from './routes/transactionRoute.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to E-Grocery");
});

app.use('/products', productsRouter); 
app.use('/cart', cartProductRouter); 
app.use('/transactions', transactionRouter); 

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });