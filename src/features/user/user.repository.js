import mongoose from "mongoose";
import { userSchema } from "./user.schema";
import { ApplicationError } from "../../error-handler/applicationError";

// creating model from schema
const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {

    async signUp(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async signIn() {
        try {
            return await UserModel.findOne({email, password});
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    
    async findByEmail(email) {
        try{
            return await UserModel.findOne({email});
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}