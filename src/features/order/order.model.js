import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: String,
  qty: Number,
  price: Number
});

const Order = mongoose.model('Order', orderSchema);

export default Order;