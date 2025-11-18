import { getDB } from '../../config/mongodb.js';

export class OrderRepository {
    async placeOrder(userId) {
        // Logic to place an order for the user with userId
        console.log(`Placing order for user: ${userId}`);
        const db = getDB();

        const orderDetails = await db.collection('orders').aggregate([
            // 1. get cart items for the user 
            { $match: { userId: userId } },
            // 2. get matching products from products collection
            { $lookup: 
                {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            // 3. unwind the productInfo array
            { $unwind: '$productInfo' },
            // 4. calculate total price for each cart item
            {
                $addFields: {
                    totalPrice: { $multiply: ['$quantity', '$productInfo.price'] }
                }
            }
        ]).toArray();
        console.log(orderDetails);
        return orderDetails;
    }
}