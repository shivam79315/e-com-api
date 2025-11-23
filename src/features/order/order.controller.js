import { OrderRepository } from "./order.repository.js";

export class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      const userId = req.userID;
      await this.orderRepository.placeOrder(userId);
      res.status(201).send("Order placed successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to place order");
    }
  }

  async getTotalAMount(req, res, next) {
    try {
      const userId = req.userID;
      const totalAmount = await this.orderRepository.getTotalAMount(userId);
      res.status(200).json({ totalAmount });
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to get total amount");
    }
  }
}
