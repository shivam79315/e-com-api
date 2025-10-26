import ProductModel from "./product.model.js";


export default class ProductController{

    getAllProducts(req,res){
        return res.status(200).send(ProductModel.getProducts());
    }

    addProduct(req, res){
        const { name, price, sizes } = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.fileName,
        }
        ProductModel.add(newProduct);
        return res.status(201).send(newProduct);
    }

    rateProduct(req,res){
        const { userID, productID, rating } = req.query;
        const error = ProductModel.rateProduct(
            userID,
            productID,
            rating
        );
        if(error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).send("success");
        }
    }

    getOneProduct(req,res){
        const { id } = req.params;
        const product = ProductModel.getProduct(id);
        if(!product) {
            return res.status(404).send("Product not found");
        } else {
            return res.status(200).send(product);
        }
    }

    filterProducts(req, res){
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 1000;
        const category = req.query.category || 'Cateogory1';

        const products = ProductModel.filter(minPrice, maxPrice, category);
        console.log(products)
        if(products.length === 0) {
            return res.status(404).send("No products found");
        } else {
            return res.status(200).send(products);
        }
    }

}