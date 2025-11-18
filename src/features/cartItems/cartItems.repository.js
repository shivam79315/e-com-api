// cartItems repository

import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class CartItemsRepository{

    constructor() {
        this.collection = "cartItems";
    }

    async add(productID, userID, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);

            const id = await this.getNextCartItemID();

            await collection.updateOne({productID : new ObjectId(productID), userID: new ObjectId(userID), quantity},
            {
                $setOnInsert: {_id: id},
                $inc: {quantity: quantity}},
            {upsert: true}
            );
        } catch (error) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);

            const items = await collection.find({userID: new ObjectId(userID)}).toArray();
            return items;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(cartItemID, userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);

            const result = await collection.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)});
            return result.deletedCount>0;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getNextCartItemID() {
        try {
            const db = getDB();
            const collection = db.collection("counters");

            const value = await collection.findOneAndUpdate(
                { id: "cartItemID" },
                { $inc: { seq: 1 } },
                { returnDocument: "after", upsert: true }
            );

            console.log("Next cart item ID:", value);

            return value.seq;

        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}