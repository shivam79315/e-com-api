import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController{
    signUp(req, res) {
        const { 
            name, 
            email, 
            password, 
            type 
        } = req.body;
        const user = UserModel.signUp(name, email, password, type);
        res.status(201).send(user);
    }

    signIn(req, res) {
        const result = UserModel.signIn(
            req.body.email,
            req.body.password
        );
        if (!result) {
            return res.status(400).send("User not found");
        } else {
            // 1. generate jwt token
            const token = jwt.sign(
                {
                    userID : result.id, 
                    email : result.email
                }, 
                "cf2f364b30417d5d45cf1b0ca0603985", 
                {
                expiresIn : "1h"
                }
            )
            // 2. send token to client
            return res
            .cookie("token", token, { httpOnly : true})
            .status(200).send(token);
        }
    }

    getUsers(req, res) {
        const users = UserModel.getUsers();
        console.log(users);
        return res.status(200).send(users);
    }
}