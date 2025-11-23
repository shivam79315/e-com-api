import { getClient, getDB } from '../../config/mongodb.js';
import Order from './order.model.js';
import {ObjectId} from 'mongodb';

export class OrderRepository {
    async placeOrder(userId) {
        // Logic to place an order for the user with userId
        try {
            console.log(`Placing order for user: ${userId}`);
            const client = getClient();
            const session = client.startSession();
            const db = getDB();

            session.startTransaction();

            const items = await this.getTotalAMount(userId, session);
            const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
            console.log(`Total amount for the order: ${totalAmount}`);

            const newOrder = Order(new ObjectId(userId), items, totalAmount, new Date());

            const orderDetails = await db.collection('orders').insertOne(newOrder, { session });

            for(let item of items){
                await db.collection('products').updateOne(
                    { _id: new ObjectId(item.productID) },
                    { $inc: { stock: -item.quantity } },
                    { session }
                );
                await db.collection('cartItems').deleteMany({userId: new ObjectId(userId), productID: item.productID}, { session });
            }

            if (session.inTransaction()) {
                await session.commitTransaction();
            }
            session.endSession();
            return orderDetails;
        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            throw error;
        }
    }

    async getTotalAMount(userId, session) {
        const db = getDB();
        
        const items = await db.collection('cartItems').aggregate([
            // 1. Match cart items for the user
            {
                $match: { userId: new ObjectId(userId) }
            },
            // 2. Lookup products from products collection
            {
                $lookup: {
                    from: 'products',
                    localField: 'productID',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            // 3. Unwind the productInfo array
            { $unwind: '$productInfo' },
            // 4. Calculate total price for each cart item
            {
                $addFields: {
                    totalPrice: { $multiply: ['$quantity', '$productInfo.price'] }
                }
            }
        ], {session}).toArray();

        return items;
    }
}