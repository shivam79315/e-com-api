
import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017/ecomdb";
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = "mongodb://127.0.0.1:27017/ecomdb";

let client;
export const connectToMongoDB = ()=>{
     MongoClient.connect(process.env.DB_URI)
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

const createCounter = async ()=>{
    const db = getDB();
    const collection = db.collection("counters");
    const counter = await collection.findOne({id: "productID"});
    if(!counter){
        await collection.insertOne({id: "productID", seq: 0});
    }
}