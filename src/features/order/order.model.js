import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      qty: Number,
      price: Number,
      totalPrice: Number
    }
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;