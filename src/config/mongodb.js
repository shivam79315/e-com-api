
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// const url = "mongodb://localhost:27017/ecomdb";
const url = process.env.DB_URI;

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url);
        console.log(">> DB connected.")
    } catch (error) {
        console.log("DB connection error:", error);
    }
}

let client;
export const connectToMongoDB = ()=>{
     MongoClient.connect("mongodb://localhost:27017/ecomdb?replicaSet=rs0")
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected");
            createCounter();
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    return client.db();
}

export const getClient = ()=> {
    return client;
}

const createCounter = async ()=>{
    const db = getDB();
    const collection = db.collection("counters");
    const counter = await collection.findOne({id: "productID"});
    if(!counter){
        await collection.insertOne({id: "productID", seq: 0});
    }
}