// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import fileUploadMiddleware from '../../middlewares/fileUpload.middleware.js';

// 2. Initialize Express router.
const router = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products 
router.get('/', productController.getAllProducts);
router.post('/addProduct', fileUploadMiddleware.single('imageUrl'), productController.addProduct);
router.get('/product/:id', productController.getOneProduct);
router.get('/filter', productController.filterProducts);
router.post('/rateProduct', productController.rateProduct);

export default router;