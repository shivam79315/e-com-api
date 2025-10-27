// Import express
import express from 'express';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';

import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';

import apiDocs from './swagger.json' with {type:'json'};

// 2. Create Server
const server = express();

// cors 
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://e-com-api-i9yc.onrender.com');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    if(req.method == "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
})

server.use(cookieParser());
server.use(express.json());

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs))

// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/cart", jwtAuth, cartRouter);
server.use("/api/users", UserRouter);

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

// 4. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
});

