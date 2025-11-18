import express from "express";

import productRouter from "../src/features/product/product.routes.js";
import userRouter from "../src/features/user/user.routes.js";
import cartRouter from "../src/features/cartItems/cartItems.routes.js";
import orderRouter from "../src/features/order/order.routes.js";

import jwtAuth from "../src/middlewares/jwt.middleware.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/cartItems", jwtAuth, cartRouter);
router.use("/orders", jwtAuth, orderRouter);

export default router;