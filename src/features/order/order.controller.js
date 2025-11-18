import { OrderRepository } from "./order.repository.js";

export class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      const userId = req.user.userID;
      await this.orderRepository.placeOrder(userId);
      res.status(201).send("Order placed successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to place order");
    }
  }
}
