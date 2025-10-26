// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import CartController from './cart.controller.js';

// 2. Initialize Express router.
const cartRouter = express.Router();
const cartController = new CartController();

// All the paths to the controller methods.
// localhost/api/cart 
cartRouter.get('/', cartController.getAll);
cartRouter.post('/add', cartController.add);
cartRouter.delete('/delete/:id', cartController.deleteItem);

export default cartRouter;