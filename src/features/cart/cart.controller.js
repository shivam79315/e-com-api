import CartModel from "./cart.model.js";

export default class CartController {
    // add item to cart
    add(req, res) {
        const { productID, qty } = req.query;
        const userID = req.userID;
        const addedItem = CartModel.addItem(userID, productID, qty);
        return res.status(201).send(addedItem);
    }

    getAll(req, res) {
        const allItems = CartModel.getAll(req.userID);
        return res.status(200).send(allItems);
    }

    // delete cart items
    deleteItem(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        const error = CartModel.deleteItem(cartItemID, userID);
        if(error) {
            return res.status(404).send(error);
        }
        return res.status(200).send("Item has been removed.");
    }
}