// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';

// 2. Initialize Express router.
const UserRouter = express.Router();
const userController = new UserController();

// All the paths to the controller methods.
// localhost/api/auth 
UserRouter.post('/sign-up', userController.signUp);
UserRouter.post('/sign-in', userController.signIn);
UserRouter.get('/all-users', userController.getUsers);

export default UserRouter;