// userID, productID, quantity

export default class CartModel{
    constructor(userID, productID, quantity, id) {
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
        this.id = id;
    }

    static addItem(userID, productID, qty) {
        const cartItem = new CartModel(
            userID,
            productID,
            qty
        );
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static getAll(id) {
        const items = cartItems.filter((i) => i.userID == id);
        return items;
    }

    static deleteItem(cartItemID, userID) {
        const cartItemIdx = cartItems.findIndex(i => i.id == cartItemID && i.userID == userID);
        if(cartItemIdx == -1) {
            return "Item not found.";
        } else {
            cartItems.splice(cartItemIdx, 1);
        }
    }
}

var cartItems = [
    new CartModel(1, 1, 2, 1),
    new CartModel(2, 2, 2, 2),
    new CartModel(2, 3, 2, 3)
]