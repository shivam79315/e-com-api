// src/features/product/product.moedel.js

import { UserModel } from "../user/user.model.js";

export default class ProductModel {
    constructor(id, name, desc, price, imageUrl, category, sizes) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }

    static add(product) {
      product.id = products.length + 1;
      products.push(product);
      return product;
    }

    static getProducts() {
      return products;
    }

    static getProduct(id) {
      return products.find((product) => product.id == id);
    }

    static filter(minPrice, maxPrice, category) {
      return products.filter(
        (p) =>
          p.price >= minPrice &&
          p.price <= maxPrice &&
          p.category === category
      );
    }

    static rateProduct(userID, productID, rating) {
      const user = UserModel.getUsers().find((u) => u.id == userID);

      if(!user) {
        return "User not found";
      }

      const product = products.find((p) => p.id == productID);

      if(!product) {
        return "Product not found";
      }

      if(!product.ratings) {
        product.ratings = [];
        product.ratings.push({
          userID: userID,
          rating: rating
        })
      } else {
        const existingRatingIndex = product.ratings.findIndex(r => r.userID == userID);
        if (existingRatingIndex >= 0) {
          product.ratings[existingRatingIndex] = {
            userID: userID,
            rating: rating
          }
        } else {
          product.ratings.push({
            userID: userID,
            rating: rating
          })
        }
      }
    }

}

var products = [
    new ProductModel(
        1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )
]